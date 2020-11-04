import cardTemplate from "./templates/cardTemplate.hbs";

const apiKey = '18970346-3d451e610c9741be437dec23e';

const cardGallery = document.querySelector('.gallery')


let page = 1;
const searchRes = document.querySelector('input');
const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchRes.value}&page=${page}&per_page=12&key=${apiKey}
`)
        .then(data => data.json())
        .then(({ hits }) => {
            const card = cardTemplate(hits);
            cardGallery.insertAdjacentHTML('beforeend', card);

        })


})
