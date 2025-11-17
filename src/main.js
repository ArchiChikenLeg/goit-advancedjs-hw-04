import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';


const searchForm = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');


let currentQuery = '';
let page = 1;
const perPage = 15;
let totalHits = 0;


const handleFormSubmit = async (event) => {
  event.preventDefault();

  const searchInput = searchForm.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();


  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  clearGallery(galleryElement);

  currentQuery = query;
  page = 1;
  totalHits = 0;
  loadMoreBtn.style.display = 'none';
  showLoader(loaderElement);

  try {

    const data = await searchImages({ query, page, per_page: perPage });

    hideLoader(loaderElement);


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


    renderGallery(data.hits, galleryElement, { append: false });
    totalHits = data.totalHits || 0;


    if (totalHits > page * perPage) {
      loadMoreBtn.style.display = 'inline-block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
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


searchForm.addEventListener('submit', handleFormSubmit);

loadMoreBtn.addEventListener('click', async () => {
  if (!currentQuery) return;

  page += 1;
  loadMoreBtn.style.display = 'none';
  showLoader(loaderElement);

  try {
    const data = await searchImages({ query: currentQuery, page, per_page: perPage });
    hideLoader(loaderElement);

    if (data.hits.length > 0) {
      renderGallery(data.hits, galleryElement, { append: true });

      const firstCard = galleryElement.querySelector('.gallery-item');
      if (firstCard) {
        const { height } = firstCard.getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: 'smooth' });
      }
    }

    totalHits = data.totalHits || totalHits;

    if (page * perPage >= totalHits) {

      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 4000,
      });
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  } catch (error) {
    hideLoader(loaderElement);
    console.error('Load more error:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again!',
      position: 'topRight',
      timeout: 4000,
    });
  }
});
