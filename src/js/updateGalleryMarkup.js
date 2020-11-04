import imagesListTemplate from '../templates/images-list.hbs';
import { refs } from './refs.js';

function updateGalleryMarkup(hits) {
    const murkup = imagesListTemplate(hits)

    refs.galleryList.insertAdjacentHTML('beforeend', murkup);
}

export default updateGalleryMarkup;