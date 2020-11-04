export const input = document.querySelector('[name="query"]');
const list = document.querySelector('.gallery');
let page = 1;
let keyWord = '';
let renderTimes = 1;

const loadMore = function () {
  const screenY = document.documentElement.scrollHeight;
  searchImage();

  window.scrollTo({
    top: screenY,
    behavior: 'smooth',
  });
};

export const searchImage = function () {
  let word = input.value;

  if (word === keyWord) {
    page += 1;

    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${word}&page=${page}&per_page=12&key=18951897-f7110a11ebc58b866f93acf70`,
    )
      .then(data => data.json())
      .then(data => renderImage(data));
  } else {
    list.innerHTML = '';

    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${word}&page=${page}&per_page=12&key=18951897-f7110a11ebc58b866f93acf70`,
    )
      .then(data => data.json())
      .then(data => renderImage(data));

    const screenY = document.documentElement.scrollHeight;

    if (renderTimes === 1) {
      document.body.insertAdjacentHTML(
        'beforeend',
        `<button type="button" class="load-more">Load more...</button>`,
      );
      document.querySelector('.load-more').addEventListener('click', loadMore);
      renderTimes += 1;
    }

    keyWord = word;
  }
};

const renderImage = function (images) {
  [...images.hits].forEach(el => {
    list.innerHTML += `<li class="photo-card">
            <img height="400px" width="300px" src="${el.webformatURL}" alt="" />
            <div class="stats">
                <p class="stats-item">
                    <i class="material-icons">thumb_up</i>
                    ${el.likes}
                </p>
                <p class="stats-item">
                    <i class="material-icons">visibility</i>
                    ${el.views}
                </p>
                <p class="stats-item">
                    <i class="material-icons">comment</i>
                    ${el.comments}
                </p>
                <p class="stats-item">
                    <i class="material-icons">cloud_download</i>
                    ${el.downloads}
                </p>
            </div>
        </li>`;
  });
};
