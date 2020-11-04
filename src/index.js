import './styles.css';
import './scss/normalize.scss';
import 'material-design-icons/iconfont/material-icons.css';
import './scss/basicLightBox.scss';

import updateGalleryMarkup from './js/updateGalleryMarkup';

import { refs } from './js/refs.js';
import apiService from './js/apiService.js';
import loadMoreBtn from './js/loadMoreBtn.js';
import error from './js/pnotify.js';
import createModal from './js/basicLightbox.js';


refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', fetchImages);
refs.galleryList.addEventListener('click', hadleOpenModal);


function searchFormSubmitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value;

    clearGalleryList();
    apiService.resetPage();
    fetchImages();
    form.reset();
};

function fetchImages() {

    loadMoreBtn.disable();

    apiService.fetchImages().then(hits => {
        if (hits.length > 0) {
            updateGalleryMarkup(hits);
            loadMoreBtn.show();
            loadMoreBtn.enable();
            window.scrollTo({
                top: 10000,
                behavior: 'smooth'
            });
        } else {
            error('Sorry. No results were found for your search!');
            loadMoreBtn.hide();
        }
    }).catch(error => (console.log(error)));
};

function clearGalleryList() {
    refs.galleryList.innerHTML = '';
};

function hadleOpenModal(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const largeImageURL = event.target.dataset.source;

    createModal(largeImageURL);
}
