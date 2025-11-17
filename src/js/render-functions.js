import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

/**
 * Создает HTML разметку для карточки изображения
 * @param {Object} image - объект с данными изображения
 * @returns {string} - HTML разметка карточки
 */
const createImageCard = (image) => {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
        />
      </a>
      <div class="image-info">
        <div class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${likes}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${views}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${comments}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${downloads}</span>
        </div>
      </div>
    </li>
  `;
};

/**

 * @param {Array} images 
 * @param {HTMLElement} galleryElement
 */
export const renderGallery = (images, galleryElement, { append = false } = {}) => {
  const markup = images.map((image) => createImageCard(image)).join('');

  if (append) {
    galleryElement.insertAdjacentHTML('beforeend', markup);
  } else {
    galleryElement.innerHTML = markup;
  }


  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery-link', {
      captions: true,
      captionsData: 'alt',
      docClose: true,
      scrollZoom: true,
    });
  }
};

/**

 * @param {HTMLElement} galleryElement 
 */
export const clearGallery = (galleryElement) => {
  galleryElement.innerHTML = '';
};

/**

 * @param {HTMLElement} loaderElement 
 */
export const showLoader = (loaderElement) => {
  loaderElement.style.display = 'block';
};

/**
 * @param {HTMLElement} loaderElement 
 */
export const hideLoader = (loaderElement) => {
  loaderElement.style.display = 'none';
};
