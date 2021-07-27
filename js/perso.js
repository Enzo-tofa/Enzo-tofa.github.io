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

  updateInfo() {
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

  deplace(old_index, index, mvt, map) {
    console.log(map.arsenal);
    if (tab_position[index] === 1) {
      alert(this.nom + " fait face à un bloc.");
    }
    else if ((tab_position[index] === "arme1Class") || (tab_position[index] === "arme2Class") || (tab_position[index] === "arme3Class") || (tab_position[index] === "arme4Class")) {
      this.degat = map.arsenal[tab_position[index]].degat;
      this.updateInfo();
      alert(this.nom + " s'équipe d'une arme avec " + this.degat + " points de dégâts.");
      if (this.arme === "") {
        $carte.append("<div class='casevideClass' style='left:" + (index % 10) * 50 + "px; top:" + Math.floor(index / 10) * 50 + "px ;position: absolute;'></div>");
        this.arme = tab_position[index];
      } 
      else {
        let arme = document.getElementById(tab_position[index].substring(0, 5));
        console.log(arme);
        arme.className = this.arme;
        arme.id = this.arme.substring(0, 5);
        this.armeDropped[0] = index;
        console.log(this.armeDropped[0]);
        this.armeDropped[1] = this.arme;
      }
      this.arme = tab_position[index];
      if (mvt == "gauche") {
        this.elm.css('left', parseInt(this.elm.css('left')) - 50);
      } else if (mvt == "droite") {
        this.elm.css('left', parseInt(this.elm.css('left')) + 50);
      } else if (mvt == "haut") {
        this.elm.css('top', parseInt(this.elm.css('top')) - 50);
      } else if (mvt == "bas") {
        this.elm.css('top', parseInt(this.elm.css('top')) + 50);
      }
    } else if ((tab_position[index] === 3) || (tab_position[index] === 4)) {
      alert(this.nom + " lance le combat");
      combat(map.getPerso1(), map.getPerso2(), this);
      $(document).off('keydown');
    }

    else if (tab_position[index] === 0) {

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

    if (this.nom == "Dragon" && tab_position[index] === 0) {
      tab_position[index] = 3;
    }
    if (this.nom == "Dovakhiin" && tab_position[index] === 0) {
      tab_position[index] = 4;
    }
    console.log(this.armeDropped, this.armeDropped[0]);
    if (this.armeDropped && this.armeDropped[0] == old_index) {
      tab_position[old_index] = this.armeDropped[1];
      this.armeDropped[1] = null;
      this.armeDropped[0] = null;
    } else {
      tab_position[old_index] = 0;
    }

    if (this === map.getPerso1() && map.getPerso2().sante > 0 && tab_position[index] != 1 || this === map.getPerso2() && map.getPerso1().sante > 0 && tab_position[index] != 1) {
      game.verifieCompteur();
      this.updateInfo();
    }
  }
}
