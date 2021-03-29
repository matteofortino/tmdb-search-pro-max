export default class Tmdb {
    constructor(apiKey) 
    {
        this.BASE_URL = 'https://api.themoviedb.org/3'
        this.API_KEY = apiKey
    }

    async searchMovies(query)
    {
        return await this.fetchData(`/search/movie?query=${encodeURIComponent(query)}&`)
    }

    async getMovie(id) 
    {
        return await this.fetchData(`/movie/${id}?append_to_response=credits&`)
    }

    async getCollection(id)
    {
        return await this.fetchData(`/collection/${id}?`)
    }

    async fetchData(endpoint) {
        return await fetch(`${this.BASE_URL}${endpoint}api_key=${this.API_KEY}`)
                .then(response => response.json())
    }

    static getImageURL(path, width = 'w300') {
        return `https://image.tmdb.org/t/p/${width}/${path}`
    }
}




