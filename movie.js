import Tmdb from './tmdb'

const tmdb = new Tmdb(process.env.TMDB_API_KEY)

const title = document.getElementById('title')
const overview = document.getElementById('overview')
const poster = document.getElementById('img')
const releaseDate = document.getElementById('release-date')
const genresEl = document.getElementById('genres')
const credits = document.getElementById('credits')
const collectionEl = document.getElementById('collection')

const params = new URL(document.location.href).searchParams
const movieId = params.get('id')

window.addEventListener('load', async () => {
    const movie = await tmdb.getMovie(movieId)
    console.log(movie)

    if(movie.belongs_to_collection)
    {
        const collection = await tmdb.getCollection(movie.belongs_to_collection.id)
        console.log(collection)

        collection.parts.forEach(part => {
            const div = document.createElement('div')
            const img = document.createElement('img')
            const title = document.createElement('a')
            img.src = Tmdb.getImageURL(part.poster_path, 'w92')
            
            title.href = `/movie.html?id=${part.id}`
            title.innerText = part.title

            div.append(img, title)
            collectionEl.append(div)
        })
    }

    movie.genres.forEach(genre => {
        const genres = document.createElement('span')
        genres.innerText = genre.name + ', '
        genresEl.append(genres)
    })

    movie.credits.cast.forEach(member => {
        const div = document.createElement('div')
        const img = document.createElement('img')
        const span = document.createElement('span')
        span.innerText = member.name + ", " + member.character
        img.src = Tmdb.getImageURL(member.profile_path, 'w92')

        div.append(img, span)
        credits.append(div)
    })
    poster.src = Tmdb.getImageURL(movie.poster_path, 'w200')

    releaseDate.innerText = 'Release date: ' + movie.release_date
    title.innerText = movie.title
    overview.innerText = 'OVERVIEW: ' + movie.overview
});
