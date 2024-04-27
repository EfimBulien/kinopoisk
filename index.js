function Movie(title, director, year) {
  this.title = title;
  this.director = director;
  this.year = year;
}

let movies = [];

function validateMovie(title, director, year) {
  if (!title || !director || !year || isNaN(year)) {
    alert('Пожалуйста, заполните все поля.');
    return false;
  }

  if (/^\d+$/.test(title) || /\d/.test(director)) {
    alert('Название фильма и имя режиссера не могут состоять только из цифр.');
    return false;
  }

  if (director == title) {
    alert('Название фильма и имя режиссера не могут совпадать.')
    return false;
  }

  if (year < 1895 || year > 2025) {
    alert('Указанный год не является корректным.');
    return false;
  }

  return true;
}


function addMovie(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const director = document.getElementById('director').value;
  const year = parseInt(document.getElementById('year').value);

  if (!validateMovie(title, director, year)) return;

  const movie = new Movie(title, director, year);

  movies.push(movie);

  displayMovies();

  document.getElementById('title').value = '';
  document.getElementById('director').value = '';
  document.getElementById('year').value = '';
}

function displayMovies() {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';

  movies.forEach((movie, index) => { 
    const movieElement = createMovieElement(movie, index); 

    moviesContainer.appendChild(movieElement); 
  });
}

function createMovieElement(movie, index) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  movieElement.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Режиссер:</strong> ${movie.director}</p>
    <p><strong>Год выпуска:</strong> ${movie.year}</p>
    <button onclick="editMovie(${index})">Изменить</button>
    <button onclick="deleteMovie(${index})">Удалить</button>
  `;

  return movieElement;
}

function editMovie(index) {
  const movie = movies[index];
  
  const newTitle = prompt('Введите новое название фильма:', movie.title);
  const newDirector = prompt('Введите нового режиссера фильма:', movie.director);
  const newYear = parseInt(prompt('Введите новый год выпуска фильма:', movie.year));

  if (!validateMovie(newTitle, newDirector, newYear)) return;

  movies[index].title = newTitle;
  movies[index].director = newDirector;
  movies[index].year = newYear;

  displayMovies();
}

function deleteMovie(index) {
  movies.splice(index, 1);

  displayMovies();
}

document.getElementById('movie-form').addEventListener('submit', addMovie);
