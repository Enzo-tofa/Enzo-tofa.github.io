class Map {
  constructor(long, large) {
    this.long = long;           // Longeur de notre carte
    this.large = large;         // Largeur de notre carte
    this.arsenal = [];          // Notre tableau qui enregistre les armes pour les permutations   
    this.perso1_sur_la_map = false;     // La variable qui vérifie la présence du perso1
    this.perso2_sur_la_map = false;     // La variable qui vérifie la présence du perso2
  }

  genere_carte_aleat() {  //Fonction qui génére la carte de manière aléatoire

    let nb_arme_sur_la_map = 0;
    for (let i = 0; i < this.long; i++) {
      for (let j = 0; j < this.large; j++) {

        const random = nb_aleat(20);    //Variable alétoire sur 20 pour générer la case spécifié
        index = getIndex(i, j, longueur);

        if (random === 11 && this.perso1_sur_la_map === false && index > 60) { //Condition pour générer le perso 1 sur la carte : 1/20
          $carte.append("<img src='img/perso1_dragon_petit.png' class='persoClass' id='perso1' style='left:" + 50 * j + "px; top:" + 50 * i + "px'>"); //Ajout de l'affichage à la derniere place de notre carte
          this.perso1_sur_la_map = true;          // Le perso 1 est définie comme présent sur la carte
          tab_position.push(3);            // On push l'id de notre perso dans le tableau, 3 réprésentant le joueur 1
          this.perso1 = new Perso("Dragon", 100, 10, $("#perso1"), 0);       //  On crée notre perso à partir de la classe Perso
          this.perso1.updateInfo();                     //On met à jour les élément html à partir des infos que l'on viens de mettre
          $carte.append("<div class='casevideClass'></div>");          //On met une case vide sous le personnage
        }
         else if (random === 12 && this.perso2_sur_la_map === false && index < 40) {   //Conditions pour générer le perso 2 sur la carte : 1/20
          $carte.append("<img src='img/perso2_dovakhiin_petit.png' class='persoClass' id='perso2' style='left:" + 50 * j + "px; top:" + 50 * i + "px'>");
          this.perso2_sur_la_map = true;
          tab_position.push(4);         // On push l'id de notre perso dans le tableau, 4 réprésentant le joueur 2
          this.perso2 = new Perso("Dovakhiin", 100, 10, $("#perso2"), 0);
          this.perso2.updateInfo();
          $carte.append("<div class='casevideClass'></div>");
        }
        else if (random === 1 && nb_arme_sur_la_map < 1) { //Condition pour générer la première arme : 1/20
          $carte.append("<div id='arme1' class='arme1Class'></div>");  //Ajoute l'affichage de l'arme
          nb_arme_sur_la_map++; // Indentation pour ajouter la prochaine arme
          tab_position.push("arme1Class");   // On push l'id de notre arme
          this.arme1 = new Arme("explosion de magie", 15, "arme3"); // On crée notre arme à partir de la classe Arme
          this.arsenal["arme1Class"] = this.arme1; //On ajoute dans notre tableau arsenal la première arme 
        } 
        else if (random === 1 && nb_arme_sur_la_map < 2) { //Condition pour générer la deuxième arme qui dépend de l'apparition de la première
          $carte.append("<div id='arme2' class='arme2Class'></div>");
          nb_arme_sur_la_map++;
          tab_position.push("arme2Class");
          this.arme2 = new Arme("explosion de sang", 20, "arme1");
          this.arsenal["arme2Class"] = this.arme2;
        } 
        else if (random === 1 && nb_arme_sur_la_map < 3) {
          $carte.append("<div id='arme3' class='arme3Class'></div>");
          nb_arme_sur_la_map++;
          this.arme3 = new Arme("sang vampirique", 25, "arme2");
          tab_position.push("arme3Class");
          this.arsenal["arme3Class"] = this.arme3;
        } 
        else if (random === 1 && nb_arme_sur_la_map < 4) {
          $carte.append("<div id='arme4' class='arme4Class'></div>");
          nb_arme_sur_la_map++;
          tab_position.push("arme4Class");
          this.arme4 = new Arme("explosion electrique", 30, "arme3");
          this.arsenal["arme4Class"] = this.arme4;
        } 
        else if (random === 5 || random === 6 || random === 7) { // Condition pour générer un block : 3/20
          if (tab_position[index - 11] == 0 && tab_position[index - 10] == 0 && tab_position[index - 9] == 0 && tab_position[index - 1] == 0) { // Conditions pour vérifier qu'il n'y a pas de bloc au dessus, a gauche et en diagonale supérieur droite et gauche
            $carte.append("<div class='blockClass'></div>"); // Ajoute la div du bloc
            tab_position.push(1); // On push l'id du bloc, c'est à dire 1
          }
          else { // Sinon on ajoute une case vide si les cases à coté contiennent des blocs pour eviter que les bloc bloquent le personnage
            $carte.append("<div class='casevideClass'></div>");
            tab_position.push(0); 
          }
        } 

        else { // Sinon on ajoute une case vide : 14/20
          $carte.append("<div class='casevideClass'></div>");
          tab_position.push(0);
        }
      }
    }

    if (this.perso1_sur_la_map === false) {   // Si le perso 1 n'a pas été mis sur la carte, on le replace de manière alétoire
      let random1 = nb_aleat(40) + 60;        // On le place dans la partie inférieur pour être éloigné du deuxième perso
      if (tab_position[random1] === 0) {      // Si la position correspond à une case vide on l'ajoute 
        tab_position[random1] === 3;          // On rajoute son id dans le tableau
        $carte.append("<img src='img/perso1_dragon_petit.png' class='persoClass' id='perso1' style='left:" + 50 * (random1 % 10) + "px; top:" + 50 * (Math.floor(random1 / 10)) + "px'>");
        this.perso1_sur_la_map = true;
        this.perso1 = new Perso("Dragon", 100, 10, $("#perso1"), 0);
        this.perso1.updateInfo();
      }
    }

    if (this.perso2_sur_la_map === false) {    // Si le perso 2 n'a pas été mis sur la carte, on le replace de manière alétoire
      const random2 = nb_aleat(40);            // On le place dans la partie supérieur pour être éloigné du premier perso
      if (tab_position[random2] === 0) {       // Si la position correspond à une case vide on l'ajoute 
        tab_position[random2] === 4;
        $carte.append("<img src='img/perso2_dovakhiin_petit.png' class='persoClass' id='perso2' style='left:" + 50 * (random2 % 10) + "px; top:" + 50 * (Math.floor(random2 / 10)) + "px'>");
        this.perso2_sur_la_map = true;
        this.perso2 = new Perso("Dovakhiin", 100, 10, $("#perso2"), 0);
        this.perso2.updateInfo();
      }
    }
  }

  getPerso1() { // Fonction qui nous permet de récuperer notre perso dans la fonction game
    return this.perso1;
  }
  getPerso2() { // Fonction qui nous permet de récuperer notre perso dans la fonction game
    return this.perso2;
  }
};

