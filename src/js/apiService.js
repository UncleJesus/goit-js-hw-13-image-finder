export default {

    searchQuery: '',
    page: 1,

    fetchImages() {
        const apiKey = '18773042-c85a376c8239f0d185771db9c';
        const baseUrl = 'https://pixabay.com/api/';
        const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

        return fetch(url)
            .then(res => res.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            })
            .catch(error => console.log(error));
    },

    resetPage() {
        this.page = 1;
    },

    incrementPage() {
        this.page += 1;
    },

    get query() {
        return this.searchQuery;
    },

    set query(value) {
        this.searchQuery = value;
    }
};