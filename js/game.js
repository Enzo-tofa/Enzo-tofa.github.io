function game() {

  this.compteur_de_tour = 0;    // Initialisation du compteur de tour pour les joueurs
  this.map = new Map(10, 10);   // Initialisation de la carte
  this.perso1;
  this.perso2;
  this.perso_actuel;


  this.lancementJeu = () => {        // Méthode qui lance la partie
    this.map.genere_carte_aleat();   // On génére la carte
    this.perso1 = this.map.getPerso1();  // On récupere notre perso 1
    this.perso2 = this.map.getPerso2();  // On récupere notre perso 2 

    if (nb_aleat(2) > 1) {    // Aléatoire pour savoir qui commence
      this.perso_actuel = this.perso1;
      alert(this.perso1.nom + " commence la partie.");
    } else {
      this.perso_actuel = this.perso2;
      alert(this.perso2.nom + " commence la partie.");
    }
    this.toucheEnfonce();   // On lance la fonction qui active les déplacement
  };

  this.verifieCompteur = () => { //Fonction qui s'occupe de vérifier les trois tours des perso
    this.compteur_de_tour++;
    if (this.compteur_de_tour >= 3) {      // Si le compteur de tour attein 3 on change de perso
      this.perso_actuel === this.perso1 ? this.perso_actuel = this.perso2 : this.perso_actuel = this.perso1;  // Opérande conditionel ternaire pour changer de perso
      this.compteur_de_tour = 0;   // On réinitialise le compteur
      alert("changement de joueur, au tour de " + this.perso_actuel.nom + " de jouer.");  // On affiche le changement de joueur à l'utilisateur
    }
  };

  this.toucheEnfonce = () => {  // Fonction qui met en place les déplacement par l'intermédiaire de la bibliothèque Jquery (Keydown)
    $(document).keydown((e) => {
      const old_index = getIndexPerso(this.perso_actuel);  // Récupère l'index du perso dans une variable
      if (e.which === 37) {    // Si la touche enfoncée est la flèche de gauche
        colonne--;             // On diminu de colonne
        if (colonne >= 0) {    // Si on ne sort pas de la carte
          const next_index = getIndex(ligne, colonne, longueur);    // On récupere la valeur de l'index de la nouvelle position
          this.perso_actuel.deplace(old_index, next_index, "gauche", this.map);   // On déplace le personnage à l'aide de la méthode crée
        }
      } 
      else if (e.which === 38 && old_index > 10) {  // Si la touche enfoncée est la flèche du haut et que l'index est supérieur à 10 (on ne peux pas compter un déplacement si on est sur la premiere ligne)
        ligne--;
        const next_index = getIndex(ligne, colonne, longueur);
        this.perso_actuel.deplace(old_index, next_index, "haut", this.map);
      } 
      else if (e.which === 39) {  // Si la touche enfoncée est la flèche de droite
        colonne++;
        if (colonne < this.map.long) {
          const next_index = getIndex(ligne, colonne, longueur);
          this.perso_actuel.deplace(old_index, next_index, "droite", this.map);
        }
      } 
      else if (e.which === 40) {  // Si la touche enfoncée est la flèche du bas
        ligne++;
        if (ligne < this.map.large) {
          const next_index = getIndex(ligne, colonne, longueur);
          this.perso_actuel.deplace(old_index, next_index, "bas", this.map);
        }
      }
    });
  };
};

var game = new game(); // On initialise notre fonction main
game.lancementJeu();   // On lance la partie 
