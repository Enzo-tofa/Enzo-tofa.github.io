class Map {
  constructor(long, large) {
    this.long = long;
    this.large = large;
    this.arsenal = [];
    this.nb_bloc = 0;
    this.perso1_sur_la_map = false;
    this.perso2_sur_la_map = false;
  }

  genere_carte_aleat() {

    let nb_arme_sur_la_map = 0;

    for (let i = 0; i < this.long; i++) {
      for (let j = 0; j < this.large; j++) {

        const random = nb_aleat(20);
        index = getIndex(i, j, longueur);

        if (random === 11 && this.perso1_sur_la_map === false && index > 60) {
          $carte.append("<img src='img/perso1_dragon_petit.png' class='persoClass' id='perso1' style='left:" + 50 * j + "px; top:" + 50 * i + "px'>");
          this.perso1_sur_la_map = true;
          tab_position.push(3);
          this.perso1 = new Perso("Dragon", 100, 10, $("#perso1"), 0);
          this.perso1.updateInfo();
          console.log(perso1);
          $carte.append("<div class='casevideClass'></div>");
        } else if (random === 12 && this.perso2_sur_la_map === false && index < 40) {
          $carte.append("<img src='img/perso2_dovakhiin_petit.png' class='persoClass' id='perso2' style='left:" + 50 * j + "px; top:" + 50 * i + "px'>");
          this.perso2_sur_la_map = true;
          tab_position.push(4);
          this.perso2 = new Perso("Dovakhiin", 100, 10, $("#perso2"), 0);
          this.perso2.updateInfo();
          $carte.append("<div class='casevideClass'></div>");
        }
        else if (random === 1 && nb_arme_sur_la_map < 1) {
          $carte.append("<div id='arme1' class='arme1Class'></div>");
          nb_arme_sur_la_map++;
          tab_position.push("arme1Class");
          this.arme1 = new Arme("explosion de magie", 15, "arme3");
          this.arsenal["arme1Class"] = this.arme1;
        } else if (random === 1 && nb_arme_sur_la_map < 2) {
          $carte.append("<div id='arme2' class='arme2Class'></div>");
          nb_arme_sur_la_map++;
          tab_position.push("arme2Class");
          this.arme2 = new Arme("explosion de sang", 20, "arme1");
          this.arsenal["arme2Class"] = this.arme2;
        } else if (random === 1 && nb_arme_sur_la_map < 3) {
          $carte.append("<div id='arme3' class='arme3Class'></div>");
          nb_arme_sur_la_map++;
          this.arme3 = new Arme("sang vampirique", 25, "arme2");
          tab_position.push("arme3Class");
          this.arsenal["arme3Class"] = this.arme3;
        } else if (random === 1 && nb_arme_sur_la_map < 4) {
          $carte.append("<div id='arme4' class='arme4Class'></div>");
          nb_arme_sur_la_map++;
          tab_position.push("arme4Class");
          this.arme4 = new Arme("explosion electrique", 30, "arme3");
          this.arsenal["arme4Class"] = this.arme4;
        } else if (random === 5 || random === 6 || random === 7) {

          if (tab_position[index - 11] == 0 && tab_position[index - 10] == 0 && tab_position[index - 9] == 0 && tab_position[index - 1] == 0) {
            $carte.append("<div class='blockClass'></div>");
            tab_position.push(1);
          }
          else {
            $carte.append("<div class='casevideClass'></div>");
            tab_position.push(0);
          }

        } else {
          $carte.append("<div class='casevideClass'></div>");
          tab_position.push(0);
        }
      }
    }

    if (this.perso1_sur_la_map === false) {
      let random1 = nb_aleat(40) + 60;
      if (tab_position[random1] != 1) {
        tab_position[random1] === 3;
        $carte.append("<img src='img/perso1_dragon_petit.png' class='persoClass' id='perso1' style='left:" + 50 * (random1 % 10) + "px; top:" + 50 * (Math.floor(random1 / 10)) + "px'>");
        this.perso1_sur_la_map = true;
        this.perso1 = new Perso("Dragon", 100, 10, $("#perso1"), 0);
        this.perso1.updateInfo();
      }
    }

    if (this.perso2_sur_la_map === false) {
      const random2 = nb_aleat(40);
      if (tab_position[random2] != 1) {
        tab_position[random2] === 4;
        $carte.append("<img src='img/perso2_dovakhiin_petit.png' class='persoClass' id='perso2' style='left:" + 50 * (random2 % 10) + "px; top:" + 50 * (Math.floor(random2 / 10)) + "px'>");
        this.perso2_sur_la_map = true;
        this.perso2 = new Perso("Dovakhiin", 100, 10, $("#perso2"), 0);
        this.perso2.updateInfo();
      }
    }
  }

  getPerso1() {
    return this.perso1;
  }
  getPerso2() {
    return this.perso2;
  }
};

