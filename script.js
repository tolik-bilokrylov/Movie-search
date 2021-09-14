const API_KEY = 'api_key=0adbb34bf81e230a73e19aaaeee72637';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const spinner = document.getElementById("spinner");
const info = document.getElementById("info");
const main = document.getElementById('main');

function getMovies(url) {
  spinner.removeAttribute('hidden');
  fetch(url)
    .then(response => response.json())
    .then(data => {
      spinner.setAttribute('hidden', '');
      showMovies(data.results);

      if (data.results.length === 0) {
        info.removeAttribute('hidden');
      } else {
        info.setAttribute('hidden', 'hidden');
      }
    }
    )
};

let debouncedOnInput = debounce(onInput);
document.querySelector('input').addEventListener('input', debouncedOnInput);
const search = document.querySelector('input').addEventListener('input', debouncedOnInput);

function debounce(callback) {
  let timeout;
  return function(argument) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, 1000, argument);
  }
};

getMovies(API_URL);

function onInput(event) {
  const searchString = event.target.value;

  if (searchString.length >= 3) {
    getMovies(searchURL + '&query=' + searchString);
  } else {
    getMovies(API_URL);
  }
};

function showMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
    const { title, poster_path, overview } = movie;
    const movieEl = document.createElement('li')
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <figure>
        <figcaption><h3>${title}</h3></figcaption>
        <img src="${IMG_URL + poster_path}" alt="${title}"/>
      </figure>
      <div class="overview">
        <h3>Overview</h3>
        <p>
          ${overview}
        </p>
      </div>
    `
    main.appendChild(movieEl)
  });
}
