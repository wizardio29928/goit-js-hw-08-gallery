import { galleryItems } from './app.js';

const galleryList = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

// Створення та рендер галереї
const galleryMarkup = galleryItems.map(({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
`).join('');

galleryList.innerHTML = galleryMarkup;

// Відкриття модалки
galleryList.addEventListener('click', (e) => {
  e.preventDefault();

  const isImg = e.target.classList.contains('gallery__image');
  if (!isImg) return;

  const largeImageURL = e.target.dataset.source;

  openModal(largeImageURL, e.target.alt);
});

function openModal(src, alt) {
  lightbox.classList.add('is-open');
  lightboxImage.src = src;
  lightboxImage.alt = alt;

  window.addEventListener('keydown', onKeyPress);
}

// Закриття модалки
function closeModal() {
  lightbox.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';

  window.removeEventListener('keydown', onKeyPress);
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Додаткові функції
function onKeyPress(e) {
  if (e.key === 'Escape') {
    closeModal();
  }

  const currentIndex = galleryItems.findIndex(item => item.original === lightboxImage.src);

  if (e.key === 'ArrowRight') {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    updateImage(galleryItems[nextIndex]);
  }

  if (e.key === 'ArrowLeft') {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateImage(galleryItems[prevIndex]);
  }
}

function updateImage({ original, description }) {
  lightboxImage.src = original;
  lightboxImage.alt = description;
}
