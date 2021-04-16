import Tmdb from './tmdb'
import debounce from "lodash.debounce";

const form = document.getElementById('form')
const searchbar = document.getElementById('search-bar')
const btn = document.getElementById('btn')
const movieContainer = document.getElementsByClassName('movies-container')[0]
const resultsContainer = document.getElementsByClassName('results')[0]
const tmdb = new Tmdb(process.env.TMDB_API_KEY)

// form.addEventListener('submit', search)
searchbar.addEventListener('input', debounce(search, 250))

async function search(e) {
    e.preventDefault()

    resultsContainer.innerText = null

    const { results: movies } = await tmdb.searchMovies(searchbar.value)
    console.log(movies)

    movies.forEach(movie => {
        const poster = document.createElement('img')
        const currentMovieContainer = document.createElement('div')
        const title = document.createElement('a')
        title.href = `/movie.html?id=${movie.id}`
        title.innerText = movie.title
        poster.src = Tmdb.getImageURL(movie.poster_path, 'w92')
        currentMovieContainer.append(poster, title, movie.release_date)

        resultsContainer.append(currentMovieContainer)
    });

}