import * as basicLightbox from 'basiclightbox';

function createModal(imagePath) {
    basicLightbox.create(` <img src="${imagePath}" width="1000">`).show();
}

export default createModal;