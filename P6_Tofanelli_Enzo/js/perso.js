class Perso {
  constructor(nom, sante, degat, elm, posture) {
    this.nom = nom;
    this.sante = sante;
    this.degat = degat;
    this.arme = "";
    this.armeDropped = [];
    this.elm = elm;
    this.posture = posture;
  }
  updateInfo() {                             // Methode qui met a jour les éléments html
    if (this.nom === "Dragon") {             
      document.getElementById("recapSante1").innerHTML = this.sante;
      document.getElementById("recapArme1").innerHTML = this.degat;
      document.getElementById("recapPosture1").innerHTML = this.posture;
    }
    if (this.nom === "Dovakhiin") {
      document.getElementById("recapSante2").innerHTML = this.sante;
      document.getElementById("recapArme2").innerHTML = this.degat;
      document.getElementById("recapPosture2").innerHTML = this.posture;
    }
  }

  deplace(old_index, index, mvt, map) {  //Methode qui permet le déplacement des perso

    if (tab_position[index] === 1) {   // Si il fait face à un bloc
      alert(this.nom + " fait face à un bloc.");
    }
    else if ((tab_position[index] === "arme1Class") || (tab_position[index] === "arme2Class") || (tab_position[index] === "arme3Class") || (tab_position[index] === "arme4Class")) { // Si il fais face à une arme
      this.degat = map.arsenal[tab_position[index]].degat;   // On modifie ses dégats
      this.updateInfo();    // On met a jour son recap degats
      alert(this.nom + " s'équipe d'une arme avec " + this.degat + " points de dégâts."); // On l'affiche à l'utilisateur
      if (this.arme === "") {  // si le jour n'a pas d'arme
        $carte.append("<div class='casevideClass' style='left:" + (index % 10) * 50 + "px; top:" + Math.floor(index / 10) * 50 + "px ;position: absolute;'></div>");
        this.arme = tab_position[index];
      } 
      else {
        let arme = document.getElementById(tab_position[index].substring(0, 5)); // On récupere sa valeur dans le tableau arsenal
        arme.className = this.arme;
        arme.id = this.arme.substring(0, 5);
        this.armeDropped[0] = index;          // On met a jour le tableau d'arme dropped pour la permutation
        this.armeDropped[1] = this.arme;
      }
      this.arme = tab_position[index];

      if (mvt == "gauche") {                            // On initie les mouvements 
        this.elm.css('left', parseInt(this.elm.css('left')) - 50);
      } else if (mvt == "droite") {
        this.elm.css('left', parseInt(this.elm.css('left')) + 50);
      } else if (mvt == "haut") {
        this.elm.css('top', parseInt(this.elm.css('top')) - 50);
      } else if (mvt == "bas") {
        this.elm.css('top', parseInt(this.elm.css('top')) + 50);
      }
    } 
    else if ((tab_position[index] === 3) || (tab_position[index] === 4)) { // Si on tombe sur le joueur adverse
      alert(this.nom + " lance le combat"); 
      combat(map.getPerso1(), map.getPerso2(), this);  // On lance le combat
      $(document).off('keydown');         //On désactive les déplacements
    }

    else if (tab_position[index] === 0) {   // Si le joueur va sur une case vide on initie les déplacements

      if (mvt == "gauche") {
        this.elm.css('left', parseInt(this.elm.css('left')) - 50);
      } else if (mvt == "droite") {
        this.elm.css('left', parseInt(this.elm.css('left')) + 50);
      } else if (mvt == "haut") {
        this.elm.css('top', parseInt(this.elm.css('top')) - 50);
      } else if (mvt == "bas") {
        this.elm.css('top', parseInt(this.elm.css('top')) + 50);
      }
    };

    if (this.nom == "Dragon" && tab_position[index] != 1) { // Si le dragon se déplace sur une case qui n'est pas un bloc, on modifie sa position
      tab_position[index] = 3;
    }
    if (this.nom == "Dovakhiin" && tab_position[index] != 1) { // Si le dovakhiin se déplace sur une case qui n'est pas un bloc, on modifie sa position
      tab_position[index] = 4;
    }

    if (this.armeDropped && this.armeDropped[0] === old_index) { // Si le perso a choisi une arme en en ayant déja une
      tab_position[old_index] = this.armeDropped[1];   // On met l'ancienne arme dans l'ancienne position
      this.armeDropped[1] = null;   // On réinitialise notre tableau
      this.armeDropped[0] = null;
    } 
    else {
      tab_position[old_index] = 0; // Sinon on met une case vide
    }

    if (this === map.getPerso1() && map.getPerso2().sante > 0 && tab_position[index] != 1 || this === map.getPerso2() && map.getPerso1().sante > 0 && tab_position[index] != 1) { // Si les joueurs ont leur santé et qu'il ne fonce pas dans un bloc
      game.verifieCompteur(); // On verifie le nombre de tour
      this.updateInfo();   // On met a jour les infos
    }
  }
}
