
const sectionPlayer = document.querySelector(".player");
const figure = document.querySelector("figure");
const results = document.querySelector(".results");
const input = document.querySelector("#artistName");
const form = document.querySelector('.search-form');

form.addEventListener("submit", function (ev) {
  performSearch();
  ev.stopPropagation(); //prevents the script from running up the DOM Tree
  ev.preventDefault(); // prevents the page from refreshing.
});






function returnContainingFigure(ev) {
  // begin element at whatever you clicked on
  let element = ev.target;


  while (element !== null) {
    if (element.tagName === "FIGURE") {
      return element;
    }

    element = element.parentElement;
  }

  return null;
}

results.addEventListener("click", function(ev) {

  // did the click occur inside one of the figures
  let figure = returnContainingFigure(ev);
  //let title = `Now Playing: figure.p.textContent`;
  // if figure isn't null, we clicked on a figure
  if (figure !== null) {
      // if it did, then we need to get the song to render
      let song = figure.getAttribute("data-song-url");

      // and add that player to the dom.
      let player = document.querySelector("audio");

      // set the source of the player
      player.src = song;

      // and then play it.
      player.play();
  }
});

function configureJson(response) {
  return response.json();
}

function receiveData(parsedJson) {
  for (let i=0; i< parsedJson.results.length; i++) {
    let music = parsedJson.results[i];
    let albumCovers = `

    <figure id="${music.trackId}" data-song-url="${music.previewUrl}">
    <img src="${music.artworkUrl100}"></img>
    <figurecaption>
    <p>${music.trackName}</p>
    </p>${music.artistName}</p>
    </figurecaption>
    </figure>
    `;

    results.innerHTML += albumCovers;
  }
}

function err(err) {
  return console.log(err);
}

function performSearch() {
  fetch(`https://itunes.apple.com/search?term=${input.value}`)
    .then(configureJson)
    .then(receiveData)
    .catch(err);
}
