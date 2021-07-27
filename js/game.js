function game() {

  this.compteur_de_tour = 0;
  this.map = new Map(10, 10);

  this.perso1;
  this.perso2;
  this.perso_actuel;


  this.lancementJeu = ()=> {
    this.map.genere_carte_aleat();
    this.perso1 = this.map.getPerso1();
    this.perso2 = this.map.getPerso2();

    if (nb_aleat(2) > 1) {
      this.perso_actuel = this.perso1;
      alert(this.perso1.nom + " commence la partie.");
    } else {
      this.perso_actuel = this.perso2;
      alert(this.perso2.nom + " commence la partie.");
    }
    this.toucheEnfonce();
  };
  
  this.verifieCompteur = ()=> {
    this.compteur_de_tour++;
    if (this.compteur_de_tour >= 3) {
      this.perso_actuel === this.perso1 ? this.perso_actuel = this.perso2 : this.perso_actuel = this.perso1;
      this.compteur_de_tour = 0;
      alert("changement de joueur, au tour de "+ this.perso_actuel.nom + " de jouer.");
    }
  };

  this.toucheEnfonce = ()=> {
    $(document).keydown((e)=> { 
      const old_index = getIndexPerso(this.perso_actuel);
      if (e.which === 37) { 
        colonne--; 
        if (colonne >= 0) { 
          const next_index = getIndex(ligne, colonne, longueur); 
          this.perso_actuel.deplace(old_index, next_index, "gauche", this.map);
          console.log(old_index, next_index);          
        }
      } else if (e.which === 38 && old_index>10) { 
        ligne--; 
        const next_index = getIndex(ligne, colonne, longueur);
        this.perso_actuel.deplace(old_index, next_index, "haut", this.map);
      } else if (e.which === 39) { 
        colonne++; 
        if (colonne < this.map.long) {
          const next_index = getIndex(ligne, colonne, longueur); 
          this.perso_actuel.deplace(old_index, next_index, "droite", this.map);
        }
      } else if (e.which === 40) { 
        ligne++;
        if (ligne < this.map.large) { 
          const next_index = getIndex(ligne, colonne, longueur);
          this.perso_actuel.deplace(old_index, next_index, "bas", this.map);
        }
      }
    });
  };
};

var game = new game();
game.lancementJeu();
