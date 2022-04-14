let movieList = []

let movieId = 1000

let newButton = document.getElementById("addButton")
newButton.onclick = function () { addMovie() }

let cancelButton = document.getElementById("cancel")
cancelButton.onclick = function () { cancelFunc() }

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

function cancelFunc() {
    cleanUp()
    cleanUpValidation()

    document.getElementById("mainMovie").style.display = "block"
    document.getElementById("newMovie").style.display = "none"
}

function getMovieById(movieId) {
    for (theMovie of movieList) {
        if (theMovie[0] === movieId) {
            return theMovie[1]
        }
    }
}

function addMovie() {
    document.getElementById("formHeader").innerHTML = "Add new movie:"
    let submitButton = document.getElementById("submitMovie")
    submitButton.onclick = function () { addMovieSubmit() }

    document.getElementById("mainMovie").style.display = "none"
    document.getElementById("newMovie").style.display = "block"
}

function addMovieSubmit() {
    cleanUpValidation()
    if (entryValidation()) {
        let newId = movieId++
        let movieTitle = document.getElementById("movieTitle").value
        let movieRating = document.getElementById("movieRating").value
        let userRating = document.getElementById("userRating").value
        let movieYear = document.getElementById("movieYear").value
        let movieGenres = document.querySelectorAll('input[name="genre"]')
        for (genre of movieGenres) {
            if (genre.checked === true) {
                var movieGenre = genre.value
            }
        }
        let formats = [document.getElementById("Bluray"), document.getElementById("DVD"), document.getElementById("Streaming")]
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

        let newEntry = new Movie(newId, movieTitle, movieRating, userRating, movieYear, movieGenre, availableFormats)

        movieList.push([newId, newEntry])

        addMovieToList(newEntry, formatQuantity)
        cleanUp()

        document.getElementById("mainMovie").style.display = "block"
        document.getElementById("newMovie").style.display = "none"
    }
}

function cleanUp() {
    document.getElementById("movieTitle").value = ""
    document.getElementById("movieRating").value = ""
    document.getElementById("userRating").value = ""
    document.getElementById("movieYear").value = ""
    let movieGenres = document.querySelectorAll('input[name="genre"]')
    for (genre of movieGenres) {
        genre.checked = false
    }
    document.getElementById("Bluray").checked = false
    document.getElementById("DVD").checked = false
    document.getElementById("Streaming").checked = false
}

function cleanUpValidation() {
    document.getElementById("titleError").innerHTML = ""
    document.getElementById("mrError").innerHTML = ""
    document.getElementById("urError").innerHTML = ""
    document.getElementById("yearError").innerHTML = ""
    document.getElementById("genreError").innerHTML = ""
    document.getElementById("formatError").innerHTML = ""
}

function addMovieToList(theEntry, fQuant) {
    let movieTable = document.getElementById("movieList")
    let newRow = document.createElement("tr")
    newRow.id = "row" + theEntry.id
    let newTitle = document.createElement("td")
    newTitle.innerHTML = theEntry.title
    let newMvRating = document.createElement("td")
    newMvRating.innerHTML = theEntry.mvRating
    let newUsRating = document.createElement("td")
    newUsRating.innerHTML = theEntry.usRating
    let newFormats = document.createElement("td")
    console.log(fQuant)
    if (fQuant == 2) {
        newFormats.innerHTML = `${theEntry.format[0]} & ${theEntry.format[1]}`
    } else {
        newFormats.innerHTML = theEntry.format
    }

    newRow.appendChild(newTitle)
    newRow.appendChild(newMvRating)
    newRow.appendChild(newUsRating)
    newRow.appendChild(newFormats)

    let editTd = document.createElement("td")
    let editButton = document.createElement("button")
    editButton.type = "button"
    editButton.innerHTML = "Edit"
    editButton.onclick = function () { editMovie(theEntry.id) }
    editTd.appendChild(editButton)
    newRow.appendChild(editTd)

    let deleteTd = document.createElement("td")
    let deleteButton = document.createElement("button")
    deleteButton.type = "button"
    deleteButton.innerHTML = "Delete"
    deleteButton.onclick = function () { deleteMovie(theEntry.id) }
    deleteTd.appendChild(deleteButton)
    newRow.appendChild(deleteTd)

    movieTable.appendChild(newRow)
}

function editMovie(movieId) {
    document.getElementById("formHeader").innerHTML = "Edit movie:"
    let editingMovie = updateMovie(movieId)

    document.getElementById("movieTitle").value = editingMovie.title
    document.getElementById("movieRating").value = editingMovie.mvRating
    document.getElementById("userRating").value = editingMovie.usRating
    document.getElementById("movieYear").value = editingMovie.year
    let movieGenres = document.querySelectorAll('input[name="genre"]')
    for (genre of movieGenres) {
        if (genre.value === editingMovie.genre) {
            genre.checked = true
        }
    }
    if (editingMovie.format === "All") {
        document.getElementById("Bluray").checked = true
        document.getElementById("DVD").checked = true
        document.getElementById("Streaming").checked = true
    } else if (editingMovie.format.length === 2) {
        for (theFormat of editingMovie.format) {
            document.getElementById(theFormat).checked = true
        }
    } else {
        document.getElementById(editingMovie.format).checked = true
    }

    let submitButton = document.getElementById("submitMovie")
    submitButton.onclick = function () { EditMovieSubmit(editingMovie) }

    document.getElementById("mainMovie").style.display = "none"
    document.getElementById("newMovie").style.display = "block"
}

function entryValidation() {
    let verified = true
    if (document.getElementById("movieTitle").value === "") {
        document.getElementById("titleError").innerHTML = "Field Required."
        verified = false
    }

    let mvRating = document.getElementById("movieRating").value
    if (mvRating === "G" || mvRating === "PG" || mvRating === "PG-13" || mvRating === "R") {
        document.getElementById("mrError").innerHTML = ""
    } else if (mvRating === "") {
        document.getElementById("mrError").innerHTML = "Field Required."
        verified = false
    } else {
        document.getElementById("mrError").innerHTML = "Invalid Entry."
        verified = false

    }

    let usRating = document.getElementById("userRating").value
    if (!(isNaN(usRating))) {
        if (usRating > 5 || usRating < 0) {

            document.getElementById("urError").innerHTML = "Enter a value between 1 and 5."
            verified = false
        } else if (usRating === "") {
            document.getElementById("urError").innerHTML = "Field Required."
            verified = false
        }
    } else {
        document.getElementById("urError").innerHTML = "Entry is not a number."
        verified = false
    }

    let movieYear = document.getElementById("movieYear").value
    if (!isNaN(movieYear)) {
        if (!(movieYear.length === 4)) {
            document.getElementById("yearError").innerHTML = "Entry must have exactly 4 digits."
            verified = false
        }
    } else if (movieYear === "") {
        document.getElementById("yearError").innerHTML = "Field Required."
        verified = false
    } else {
        document.getElementById("yearError").innerHTML = "Entry is not a number."
        verified = false
    }

    let movieGenres = document.querySelectorAll('input[name="genre"]')
    let genreCheck = false
    for (theGenre of movieGenres) {
        if (theGenre.checked === true) {
            genreCheck = true
        }
    }
    if (!genreCheck) {
        document.getElementById("genreError").innerHTML = "Must select a genre."
        verified = false
    }

    let formats = [document.getElementById("Bluray"), document.getElementById("DVD"), document.getElementById("Streaming")]
    let formatCheck = false
    for (each of formats) {
        if (each.checked === true) {
            formatCheck = true
        }
    }
    if (!formatCheck) {
        document.getElementById("formatError").innerHTML = "Must select at least one format owned."
        verified = false
    }

    return verified
}

function EditMovieSubmit(editingMovie) {
    cleanUpValidation()
    if (entryValidation()) {
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
        let formats = [document.getElementById("Bluray"), document.getElementById("DVD"), document.getElementById("Streaming")]
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

        let editingRow = document.getElementById("row" + editingMovie.id)
        editingRow.childNodes[0].innerHTML = document.getElementById("movieTitle").value
        editingRow.childNodes[1].innerHTML = document.getElementById("movieRating").value
        editingRow.childNodes[2].innerHTML = document.getElementById("userRating").value
        if (formatQuantity == 2) {
            editingRow.childNodes[3].innerHTML = `${editingMovie.format[0]} & ${editingMovie.format[1]}`
        } else {
            editingRow.childNodes[3].innerHTML = editingMovie.format
        }

        cleanUp()

        document.getElementById("mainMovie").style.display = "block"
        document.getElementById("newMovie").style.display = "none"
    }
}

function deleteMovie(movieId) {
    let delMovie = getMovieById(movieId)
    if (!confirm("Are you sure you want to delete " + delMovie.title + "?")) {
        return;
    } else {
        for (let i = 0; i < movieList.length; i++) {
            if (movieList[i][0] === movieId) {
                document.getElementById("row" + movieId).remove()
                movieList.splice(i, 1)
            }
        }
    }
}

function initializeList() {
    let theId = movieId++
    let movieOne = new Movie(theId, "Lost City", "PG-13", "4", "2022", "comedy", "All")
    movieList.push([theId, movieOne])
    addMovieToList(movieOne)

    theId = movieId++
    let movieTwo = new Movie(theId, "The Batman", "PG-13", "5", "2022", "action", "All")
    movieList.push([theId, movieTwo])
    addMovieToList(movieTwo)

    theId = movieId++
    let movieThree = new Movie(theId, "Lovehard", "PG-13", "3", "2021", "comedy", "Streaming")
    movieList.push([theId, movieThree])
    addMovieToList(movieThree)

    theId = movieId++
    let movieFour = new Movie(theId, "Crazy Rich Asians", "PG-13", "3", "2018", "romance", "Bluray")
    movieList.push([theId, movieFour])
    addMovieToList(movieFour)
}

initializeList()

//STYLING, EVENTUALLY CONVERT TO MVC