function combat(perso1, perso2, perso_actuel) {
  this.perso1;
  this.perso2;
  this.perso_actuel;
  if (perso_actuel === perso1) {   // Si le perso qui se déplace est le perso 1 on affiche les ordres d'attaques et de défense du perso 1
    document.getElementById("joueur1Boutons").style.display = "block";
  }
  else if (perso_actuel === perso2) {  // Si le perso qui se déplace est le perso 2 on affiche les ordres d'attaques et de défense du perso 2
    document.getElementById("joueur2Boutons").style.display = "block";
  }
  function attaquer(attaquant, defenseur) {
    if (attaquant.posture === 1) {
      defenseur.degat = defenseur.degat * 2;
      attaquant.posture = 0;
    }
    if (defenseur.sante > 0) {   // Vérifie que le défenseur ai encore des points de vie
      alert(attaquant.nom + " attaque " + defenseur.nom + " et lui fait " + attaquant.degat + " points de dégâts");   // Affiche à l'utilisateur l'attaque
      defenseur.sante = defenseur.sante - attaquant.degat;  // Enleve les dégats reçus au point de vie du defenseur
      if (defenseur.sante > 0) {   // Vérifie que le défenseur ai encore des points de vie
        alert(defenseur.nom + " a encore " + defenseur.sante + " points de vie");      // Affiche à l'utilisateur le nombre de points de vie du défenseur restant
      } else {
        defenseur.sante = 0;
        alert(defenseur.nom + " est mort !");
      }
    }
    if (defenseur.sante <= 0) { // Si le défenseur est mort
      alert(defenseur.nom + " a perdu, la partie est terminé.");  // Affiche la fin de partie
      if (window.confirm("Voulez-vous rejouez?")) {   // Demande à l'utilisateur si il veux rejouer
        location.reload();   // Recharge la page
      }
      document.getElementById("attaqueJoueur1").removeEventListener("click", attack1);     // Enlève l'evenement qui permet les attaques via les boutons
      document.getElementById("defenseJoueur1").removeEventListener("click", defense1);
      document.getElementById("attaqueJoueur2").removeEventListener("click", attack2);
      document.getElementById("defenseJoueur2").removeEventListener("click", defense2);
      document.getElementById("joueur1Boutons").style.display = "none";       // Cache les div qui contiennent les boutons
      document.getElementById("joueur2Boutons").style.display = "none";
    }
  };
  function defendre(defenseur, attaquant) {
    if (defenseur.posture == 1) {    // Si le defenseur est deja en position de défense
      alert(defenseur.nom + " est déjà en posture de défense");
    };
    if (defenseur.posture == 0) {
      defenseur.posture = 1;      // On met la posture en mode défense
      attaquant.degat = attaquant.degat / 2;      // On diminue les dégats de l'attaquant par deux
      alert(defenseur.nom + " passe en posture défensif, les dégats de " + attaquant.nom + " sont réduit de 50%.");
    };
  };
  let attack1 = () => {                                                      // fonction attaque du perso1 nommé pour le removeEventListener
    document.getElementById("joueur1Boutons").style.display = "none";        // Cache les boutons du perso 1
    document.getElementById("joueur2Boutons").style.display = "block";       // Affiche les boutons du perso 2
    attaquer(perso1, perso2);                                                // Le perso 1 attaque le perso 2
    perso1.updateInfo();                                                     // On met à jour les valeurs du perso 1
    perso2.updateInfo();                                                     // On met a jour els infos du perso 2
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
  document.getElementById("attaqueJoueur1").addEventListener("click", attack1);      // Ajout l'event pour le boutons d'attaque du perso 1
  document.getElementById("defenseJoueur1").addEventListener("click", defense1);     // Ajout l'event pour le boutons de defense du perso 1
  document.getElementById("attaqueJoueur2").addEventListener("click", attack2);      // Ajout l'event pour le boutons d'attaque du perso 2
  document.getElementById("defenseJoueur2").addEventListener("click", defense2);     // Ajout l'event pour le boutons de defense du perso 1
}
