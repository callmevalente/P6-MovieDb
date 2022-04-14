class Movie {
    constructor(id, title, mvRating, usRating, year, genre, formats) {
        this.id = id;
        this.title = title;
        this.mvRating = mvRating;
        this.usRating = usRating;
        this.year = year;
        this.genre = genre;
        this.format = formats
    }
}

let movieList = []

let movieId = 1000

function createNewMovie(movieTitle, movieRating, userRating, movieYear, movieGenre, availableFormats) {
    let newId = movieId++

    let newEntry = new Movie(newId, movieTitle, movieRating, userRating, movieYear, movieGenre, availableFormats)

    movieList.push([newId, newEntry])

    return newEntry
}

function updateMovie(editingMovie) {
    editingMovie.title = document.getElementById("movieTitle").value
    editingMovie.mvRating = document.getElementById("movieRating").value
    editingMovie.usRating = document.getElementById("userRating").value
    editingMovie.year = document.getElementById("movieYear").value
    let movieGenres = document.querySelectorAll('input[name="genre"]')
    for (theGenre of movieGenres) {
        if (theGenre.checked === true) {
            editingMovie.genre = theGenre.value
        }
    }
    let formats = [document.getElementById("Bluray"), document.getElementById("DVD"), document.getElementById("Digital")]
    let availableFormats = []
    let formatQuantity = 0
    for (each of formats) {
        if (each.checked === true) {
            formatQuantity++
            availableFormats.push(each.value)
        }
    }
    if (availableFormats.length === 3) {
        availableFormats = "All"
    }
    editingMovie.format = availableFormats

    return formatQuantity
}

function deleteMovie() {
    for (let i = 0; i < movieList.length; i++) {
        if (movieList[i][0] === movieId) {
            movieList.splice(i, 1)
        }
    }
}

function getMovieById(movieId) {
    for (theMovie of movieList) {
        if (theMovie[1].id === movieId) {
            return theMovie[1]
        }
    }
}

function getAllMovies() {
    return movieList
}