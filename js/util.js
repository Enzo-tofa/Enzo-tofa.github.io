let tab_position = [];
const $carte = $("#map");
let ligne;
let colonne;
let index;
const longueur = 10;
this.cible = '';



let nb_aleat = max => {
  return Math.floor((Math.random() * max) + 1);
}

let getIndexPerso = perso => {
  ligne = parseInt(perso.elm.css('top')) / 50;
  colonne = parseInt(perso.elm.css('left')) / 50;
  return getIndex(ligne, colonne, longueur);
}

let getIndex = (laLigne, laColonne, laLongueur) => {
  laLongueur = longueur;
  return (laLigne * laLongueur + laColonne);
}

