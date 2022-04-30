import galleryArray from './app.js';

// REFERENCES
const refs = {
  gallery: document.querySelector('.gallery.js-gallery'),
  lightBox: document.querySelector('.lightbox'),
  lightBoxImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  lightBoxOverlay: document.querySelector('.lightbox__overlay'),
};
let currentIndex;
const lastIndex = galleryArray.length - 1;

//CREATING MARKUP
const galleryHTML = galleryArray
  .map((image, i) => {
    const imgHTML = `<li class="gallery__item">
      <a class="gallery__link" href="${image.original}"> 
      <img class="gallery__image"
        src="${image.preview}"
        data-source="${image.original}"
        data-index="${i}"
        alt="${image.description}"/>
                </a>
        </li>`;

    return imgHTML;
  })
  .join('');
refs.gallery.insertAdjacentHTML('afterbegin', galleryHTML);

//GETTING IMG URL
refs.gallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    console.log(event.target.dataset.source);
    openModal(event);
  }
});
//OPENING MODAL
const openModal = function (event) {
  refs.lightBox.classList.add('is-open');
  refs.lightBoxImage.dataset.index = `${event.target.dataset.index}`;
  currentIndex = Number(refs.lightBoxImage.dataset.index);
  refs.lightBoxImage.src = `${event.target.dataset.source}`;
  refs.closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', escapePress);
  window.addEventListener('keydown', arrowPress);
};

//CLOSING MODAL
const closeModal = function () {
  console.log('closeModal'); //!!!!!!!!
  refs.lightBox.classList.remove('is-open');
  refs.lightBoxImage.src = '';

  refs.closeModalBtn.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', escapePress);
  window.removeEventListener('keydown', arrowPress);
};

refs.lightBoxOverlay.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});

function escapePress(event) {
  if (event.code === 'Escape') {
    console.log('escapePress'); //!!!!!!!!
    closeModal();
  }
}

function arrowPress(event) {
  if (event.code === 'ArrowLeft') {
    if (currentIndex === 0) {
      currentIndex = lastIndex;
      refs.lightBoxImage.src = galleryArray[lastIndex].original;
      return;
    }
    currentIndex -= 1;

    refs.lightBoxImage.src = galleryArray[currentIndex].original;
  }
  if (event.code === 'ArrowRight') {
    if (currentIndex === lastIndex) {
      currentIndex = 0;
      refs.lightBoxImage.src = galleryArray[0].original;
      return;
    }
    currentIndex += 1;
    refs.lightBoxImage.src = galleryArray[currentIndex].original;
  }
}
