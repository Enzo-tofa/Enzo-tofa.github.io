function combat(perso1, perso2, perso_actuel) {

  this.perso1;
  this.perso2;
  this.perso_actuel;

  if (perso_actuel == perso1) {
    document.getElementById("joueur1Boutons").style.display = "block";
  } else if (perso_actuel == perso2) {
    document.getElementById("joueur2Boutons").style.display = "block";
  }

  function attaquer(attaquant, defenseur) {
    if (attaquant.posture === 1) {
      defenseur.degat = defenseur.degat * 2;
      attaquant.posture = 0;
    }
    if (defenseur.sante > 0) {
      alert(attaquant.nom + " attaque " + defenseur.nom + " et lui fait " + attaquant.degat + " points de dégâts");
      defenseur.sante = defenseur.sante - attaquant.degat;
      if (defenseur.sante > 0) {
        alert(defenseur.nom + " a encore " + defenseur.sante + " points de vie");
      } else {
        defenseur.sante = 0;
        alert(defenseur.nom + " est mort !");
      }
    }
    if (defenseur.sante <= 0) {
      alert(defenseur.nom + " a perdu, la partie est terminé.");
      if (window.confirm("Voulez-vous rejouez?")) {
        location.reload();
      }
      document.getElementById("attaqueJoueur1").removeEventListener("click", attack1);
      document.getElementById("defenseJoueur1").removeEventListener("click", defense1);
      document.getElementById("attaqueJoueur2").removeEventListener("click", attack2);
      document.getElementById("defenseJoueur2").removeEventListener("click", defense2);
      document.getElementById("joueur1Boutons").style.display = "none";
      document.getElementById("joueur2Boutons").style.display = "none";
    }
  };

  function defendre(defenseur, attaquant) {
    if (defenseur.posture == 1) {
      alert(defenseur.nom + " est déjà en posture de défense");
    };
    if (defenseur.posture == 0) {
      defenseur.posture = 1;
      attaquant.degat = attaquant.degat / 2;
      alert(defenseur.nom + " passe en posture défensif, les dégats de " + attaquant.nom + " sont réduit de 50%.");
      console.log(defenseur.posture);
    };
  };

  let attack1 = () => {
    document.getElementById("joueur1Boutons").style.display = "none";
    document.getElementById("joueur2Boutons").style.display = "block";
    attaquer(perso1, perso2);
    perso1.updateInfo();
    perso2.updateInfo();
  }

  let attack2 = () => {
    document.getElementById("joueur1Boutons").style.display = "block";
    document.getElementById("joueur2Boutons").style.display = "none";
    attaquer(perso2, perso1);
    perso1.updateInfo();
    perso2.updateInfo();
  }

  let defense1 = () => {
    document.getElementById("joueur1Boutons").style.display = "none";
    document.getElementById("joueur2Boutons").style.display = "block";
    defendre(perso1, perso2);
    perso1.updateInfo();
    perso2.updateInfo();
  }

  let defense2 = () => {
    document.getElementById("joueur1Boutons").style.display = "block";
    document.getElementById("joueur2Boutons").style.display = "none";
    defendre(perso2, perso1);
    perso1.updateInfo();
    perso2.updateInfo();
  }

  document.getElementById("attaqueJoueur1").addEventListener("click", attack1);
  document.getElementById("defenseJoueur1").addEventListener("click", defense1);
  document.getElementById("attaqueJoueur2").addEventListener("click", attack2);
  document.getElementById("defenseJoueur2").addEventListener("click", defense2);


  /*
    while (this.cible.sante > 0 && perso_actuel.sante > 0) {
  
      let choix = prompt(perso_actuel.nom + " : Pressez 1 pour attaquer ou 2 pour défendre : ");
      if (choix == 1) {
        attaquer();
      }
      else if (choix == 2) {
        defendre();
      }
      else {
        alert("Veuillez choisir entre 1 et 2");
        [perso_actuel, this.cible] = [this.cible, perso_actuel];
      }
  
      this.cible.updateInfo();
      perso_actuel.updateInfo();
      [perso_actuel, this.cible] = [this.cible, perso_actuel];
    };
    if (window.confirm("Voulez vous rejouer?")) {
      location.reload();
    }*/
}
