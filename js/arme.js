class Arme {
  constructor(nom, degat, elm) {
    this.nom = nom;
    this.degat = degat;
    this.elm = elm;
  }


  decrireArme() {
    const description = this.nom + " fait " + this.degat + " points de dégâts";
    return description;
  }

}