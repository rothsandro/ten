import Alpine from "alpinejs";
import "./style.scss";

Alpine.directive(
  "interval",
  (_, { value, expression }, { cleanup, evaluateLater }) => {
    const run = evaluateLater(expression);
    const interval = setInterval(() => run(), value || 1000);
    cleanup(() => clearInterval(interval));
  }
);

Alpine.data("game", () => ({
  template: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  numbers: [],
  target: 10,
  minSelection: 2,
  maxSelection: 3,
  maxNumbers: 10,
  selected: [],
  score: 0,
  status: "INIT",
  get currentTarget() {
    return this.selected
      .reduce((acc, no) => acc + no, 0);
  },
  addNumber() {
    this.numbers.push(
      this.template[Math.floor(Math.random() * this.template.length)]
    );
  },
  reset() {
    this.selected = [];
    this.numbers = [];
    this.score = 0;
    this.status = "PLAYING";
  },
  validate() {
    if (
      this.currentTarget < this.target &&
      this.selected.length < this.maxSelection &&
      this.numbers.length <= this.maxNumbers
    ) {
      // Still playing
      return;
    }

    this.status = "LOST";
  },
  checkTarget() {
    if (
      this.currentTarget === this.target &&
      this.selected.length >= this.minSelection &&
      this.selected.length <= this.maxSelection &&
      this.numbers.length <= this.maxNumbers
    ) {
      this.score++;
      this.selected = [];
    }
  },
  selectIndex(idx) {
    const number = this.numbers[idx];
    this.selected.push(number);
    this.numbers.splice(idx, 1);
  },
}));

Alpine.start();
