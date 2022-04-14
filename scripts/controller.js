let newButton = document.getElementById("addButton")
newButton.onclick = function () { addMovie() }

let cancelButton = document.getElementById("cancel")
cancelButton.onclick = function () { cancelFunc() }

function cancelFunc() {
    cleanUp()
    cleanUpValidation()

    document.getElementById("mainMovie").style.display = "block"
    document.getElementById("newMovie").style.display = "none"
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
    deleteButton.onclick = function () { removeMovie(theEntry.id) }
    deleteTd.appendChild(deleteButton)
    newRow.appendChild(deleteTd)

    movieTable.appendChild(newRow)
}

function editMovieList(editingMovie, formatQuantity) {
    let editingRow = document.getElementById("row" + editingMovie.id)
    editingRow.childNodes[0].innerHTML = document.getElementById("movieTitle").value
    editingRow.childNodes[1].innerHTML = document.getElementById("movieRating").value
    editingRow.childNodes[2].innerHTML = document.getElementById("userRating").value
    if (formatQuantity == 2) {
        editingRow.childNodes[3].innerHTML = `${editingMovie.format[0]} & ${editingMovie.format[1]}`
    } else {
        editingRow.childNodes[3].innerHTML = editingMovie.format
    }
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
    if (!isNaN(movieYear) && !(movieYear === "")) {
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

function addMovie() {
    document.getElementById("formHeader").innerHTML = "Add new movie:"
    document.getElementById("submitMovie").innerHTML = "Submit"
    let submitButton = document.getElementById("submitMovie")
    submitButton.onclick = function () { addMovieSubmit() }

    document.getElementById("mainMovie").style.display = "none"
    document.getElementById("newMovie").style.display = "block"
}

function addMovieSubmit() {
    cleanUpValidation()
    if (entryValidation()) {
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

        let newEntry = createNewMovie(movieTitle, movieRating, userRating, movieYear, movieGenre, availableFormats)

        addMovieToList(newEntry, formatQuantity)
        cleanUp()

        document.getElementById("mainMovie").style.display = "block"
        document.getElementById("newMovie").style.display = "none"
    }
}

function editMovie(movieId) {
    document.getElementById("formHeader").innerHTML = "Edit movie:"
    document.getElementById("submitMovie").innerHTML = "Update"
    let editingMovie = getMovieById(movieId)

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

function EditMovieSubmit(editingMovie) {
    cleanUpValidation()
    if (entryValidation()) {
        let formatQuantity = updateMovie(editingMovie)

        editMovieList(editingMovie, formatQuantity)

        cleanUp()

        document.getElementById("mainMovie").style.display = "block"
        document.getElementById("newMovie").style.display = "none"
    }
}

function removeMovie(movieId) {
    let delMovie = getMovieById(movieId)
    if (!confirm("Are you sure you want to delete " + delMovie.title + "?")) {
        return;
    } else {
        document.getElementById("row" + movieId).remove()
        deleteMovie(movieId)
    }
}

function initializeList() {
    let movieOne = createNewMovie("Lost City", "PG-13", "4", "2022", "comedy", "All")
    addMovieToList(movieOne)

    let movieTwo = createNewMovie("The Batman", "PG-13", "5", "2022", "action", "All")
    addMovieToList(movieTwo)

    let movieThree = createNewMovie("Lovehard", "PG-13", "3", "2021", "comedy", "Streaming")
    addMovieToList(movieThree)

    let movieFour = createNewMovie("Crazy Rich Asians", "PG-13", "3", "2018", "romance", "Bluray")
    addMovieToList(movieFour)
}

initializeList()