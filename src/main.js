import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

// Элементы DOM
const searchForm = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');

/**
 * Обработчик события отправки формы поиска
 */
const handleFormSubmit = async (event) => {
  event.preventDefault();

  const searchInput = searchForm.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  // Проверка на пустую строку
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  // Очищаем галерею и показываем загрузчик
  clearGallery(galleryElement);
  showLoader(loaderElement);

  try {
    // Выполняем поиск
    const data = await searchImages(query);

    // Скрываем загрузчик
    hideLoader(loaderElement);

    // Проверяем результаты
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 4000,
      });
      searchInput.value = '';
      return;
    }

    // Отображаем галерею
    renderGallery(data.hits, galleryElement);
    searchInput.value = '';
  } catch (error) {
    hideLoader(loaderElement);
    console.error('Error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again!',
      position: 'topRight',
      timeout: 4000,
    });
  }
};

// Подключаем обработчик события
searchForm.addEventListener('submit', handleFormSubmit);
