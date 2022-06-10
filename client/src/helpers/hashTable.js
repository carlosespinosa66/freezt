
class HashTable {
  table = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };

  /**
   * addItem
   */
  // public addItem(name) {
  addItem(name) {
    name = name.trim();
    const firstLetter = name[0].toLocaleLowerCase();
    if (name && this.table[firstLetter]) {
      this.table[firstLetter].push(name);
    }
  }

  /**
   * autocomplete
   */

  //  public autocomplete(letter) {
  autocomplete(letter) {
    let tenNames = []; //Maximo 4 palabras

    const firstLetter = letter[0].toLowerCase();

    if (this.table[firstLetter]) {
      const names = this.table[firstLetter]; //Todos los nombres de array

      //Si existe la letra debemos recorrer el array y ver que matchea mejor:
      let corte = 0;
      for (let i = 0; i < names.length; i++) {
        if (corte > 1000) break;
        if (tenNames.length > 4) break;
        if (names[i].toLowerCase().startsWith(letter.toLowerCase())) {
          tenNames.push(names[i]);
        }
        corte++;
      }
    }
    return tenNames;
  }
}

export default HashTable;
