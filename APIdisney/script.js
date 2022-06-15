let personnage = [];
var select = document.querySelector('select');
var ulFilms = document.querySelector('#films');
var ulTVshows = document.querySelector('#tvShows')
const url = 'https://api.disneyapi.dev/characters?page=2';

fetch(url)
    .then(response => {
        return response.json(); // on précise que l'on souhaite une réponse de type JSON
    })
    .then(data => {
        personnage = data;
        console.log(personnage.data)
        chargerMenu(personnage)
        afficherInfos(personnage)
    });

// crée la liste des personnages
function chargerMenu(parametre) {
    for (i = 0; i < parametre['data'].length; i++) {
        var listeOption = document.createElement('option');
        listeOption.setAttribute("value", i);
        listeOption.textContent = parametre['data'][i].name;
        select.appendChild(listeOption);
    }
}

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        });
    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function afficherInfos(parametre) {
    var perso = $_GET("perso")
    console.log(perso) // affiche l'id du perso en console

    // affiche le nom du perso
    let nomPerso = parametre['data'][perso].name;
    document.getElementById("name").innerHTML = nomPerso;

    // affiche une image du perso
    let image = parametre['data'][perso].imageUrl;
    document.getElementById("image").innerHTML = '<img src="' + image + '" alt="image personnage">';

    // affiche la liste des films où le perso est apparu
    let films = parametre['data'][perso].films;
    if (films.length === 0) {
        console.log("No Films!")
        document.getElementById("films").innerHTML = "<h3>Films : </h3>Aucun film avec " + nomPerso + " !";
    } else {
        document.getElementById("films").innerHTML = "<h3>Films avec " + nomPerso + " : </h3>";
        films.forEach(showFilm);
    }

    // affiche la liste des shows où le perso est apparu
    let tvShows = parametre['data'][perso].tvShows;
    if (tvShows.length === 0) {
        console.log("No TV shows!")
        document.getElementById("tvShows").innerHTML = "<h3>TV Shows : </h3>Aucun TV shows avec " + nomPerso + " !";
    } else {
        document.getElementById("tvShows").innerHTML = "<h3>TV shows avec " + nomPerso + " : </h3>";
        tvShows.forEach(showTVshows);
    }
}

// montre la liste de film
function showFilm(film, index) {
    var listeFilms = document.createElement('li');
    listeFilms.setAttribute("value", i);
    listeFilms.textContent = film;
    ulFilms.appendChild(listeFilms);
    console.log("films[" + index + "] = " + film);
}

// montre la liste de TV shows
function showTVshows(tvShow, index) {
    var listeTVshows = document.createElement('li');
    listeTVshows.setAttribute("value", i);
    listeTVshows.textContent = tvShow;
    ulTVshows.appendChild(listeTVshows);
    console.log("tvShows[" + index + "] = " + tvShow);
}