class WordEndingCreator {
  // eslint-disable-next-line no-useless-constructor
  constructor(private number: number, private word: string) {}

  createEnding() {
    let ending = '';
    const stringNumber = this.number.toString();
    const lastNum = stringNumber[stringNumber.length - 1];

    if (lastNum === '1') {
      ending = '';
    } else if (lastNum === '2' || lastNum === '3' || lastNum === '4') {
      ending = 'a';
    } else {
      ending = 'ов';
    }

    return `${this.number} ${this.word + ending}`;
  }
}

/*====================*/

export default WordEndingCreator;
