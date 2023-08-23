window.onload = async () =>{
    await defaultSearch("Avengers");
    await defaultSearch("Batman");
    await defaultSearch("Justice League");
}

async function defaultSearch(busqueda){
    const URL = `https://omdbapi.com/?s=${busqueda}&page=1&apikey=b6a1b97`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    defaultLoad(data.Search);
}

function defaultLoad(movies){
    movieLoad(movies[0]);
    movieLoad(movies[1]);
    movieLoad(movies[2]);
    movieLoad(movies[3]);
    movieLoad(movies[4]);
}

function movieLoad(movie){
    let div = document.createElement('div');
    div.className = "div-movie";

    div.innerHTML = `
    <div class="movie-e">
        <a href="#">
            <img class="poster-movie" src = "${(movie.Poster != "N/A") ? movie.Poster : "image_not_found.png"}" alt = "movie poster">
        </a>
        <h2 class="titulo-movie">${movie.Title}</h2>
        <h2 class="year-movie">${movie.Year}</h2>
    </div>
    `
    div.dataset.id = movie.imdbID;
    loadMovieMain(div);
    divPeliculas.append(div);
}

function loadMovieMain(div){
    div.addEventListener('click', async () => {
        // console.log(movie.dataset.id);
        const result = await fetch(`http://www.omdbapi.com/?i=${div.dataset.id}&apikey=b6a1b97`);
        const movieDetails = await result.json();
        displayMovieDetails(movieDetails);
    });
}
