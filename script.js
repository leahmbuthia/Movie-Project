document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector('#movie-list ul');
    const forms = document.forms;

    // Load existing movies from local storage
    const moviesAvailable = JSON.parse(localStorage.getItem('movies')) || [];

    // Display existing movies
    moviesAvailable.forEach(movie => {
        appendChild(movie.movieName, movie.DateReleased);
    });

    // delete movies
    list.addEventListener('click', (e) => {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
            updateLocalStorage();
        }
    });

    function appendChild(value, date) {
        const li = document.createElement('li');
        const movieName = document.createElement('span');
        const dateMade = document.createElement('span');
        const deleteBtn = document.createElement('span');

        // add text content
        movieName.textContent = value;
        dateMade.textContent = date;
        deleteBtn.textContent = 'delete';
        // add classes
        movieName.classList.add('name');
        dateMade.classList.add('date');
        deleteBtn.classList.add('delete');
        // append to DOM
        li.appendChild(movieName);
        li.appendChild(dateMade);
        li.appendChild(deleteBtn);
        list.appendChild(li);
        updateLocalStorage();
    }

    // add movies
    const addForm = forms['add-movie'];
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // create elements
        const value = addForm.querySelector('input[type="text"]').value;
        const date = addForm.querySelector('input[type="date"]').value;

        if (value && date) {
            const objectMovie = {
                movieName: value,
                DateReleased: date
            };

            moviesAvailable.push(objectMovie);

            appendChild(value, date);

            // clear input
            addForm.querySelector('input[type="text"]').value = '';
            addForm.querySelector('input[type="date"]').value = '';

            updateLocalStorage();
        } else {
            alert('Please enter both movie name and release date.');
        }
    });

    function updateLocalStorage() {
        const jsonMovies = JSON.stringify(moviesAvailable);
        localStorage.setItem('movies', jsonMovies);
        console.log(jsonMovies);
    }
});
