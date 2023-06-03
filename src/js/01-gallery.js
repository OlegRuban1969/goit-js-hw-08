import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

// Создание и рендер разметки по массиву данных galleryItems
const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>
    `;
  })
  .join('');

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

// Инициализация библиотеки SimpleLightbox после создания и добавления элементов галереи
// будет применяться ко всем ссылкам <a>, которые находятся внутри элемента с классом gallery
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
});
