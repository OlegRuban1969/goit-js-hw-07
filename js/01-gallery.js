import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

// Создание и рендер разметки по массиву данных galleryItems
const galleryMarkup = galleryItems.map(({ preview, original, description }) => {
  // извлекаем значения preview, original и description из массива galleryItems 
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
        </a>
      </li>
    `; 
     }); // новый массив строк, строка - разметка для каждого элемента галереи     
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup.join(''));

// Реализация делегирования на ul.gallery и получение URL большого изображения
galleryEl.addEventListener('click', e => { 
  e.preventDefault(); //избежать перехода на другую страницу
  const { target } = e; //извлечение свойства target из объекта событий event
  if (target.nodeName !== 'IMG') { 
    return;
  }
//элемент, на котором было событие, это <img>,то передача в функцию URL большого изображения
  openModal(target.dataset.source);  
});

// Подключение скрипта и стилей библиотеки basicLightbox
// передается разметка модального окна (содержит тег <img>)
function openModal(url) {
  const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600" >
  `); 
//метод show() для открытия модального окна
  instance.show();

// Закрытие модального окна по клику на кнопку Esc 
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      instance.close(); //метод close() для закрытия модального окна
    }
  });
}
