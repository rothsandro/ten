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
  minCount: 2,
  maxCount: 3,
  maxLength: 10,
  selectedIdx: [],
  score: 0,
  status: "INIT",
  get currentTarget() {
    return this.selectedIdx
      .map((idx) => this.numbers[idx])
      .reduce((acc, no) => acc + no, 0);
  },
  addNumber() {
    this.numbers.push(
      this.template[Math.floor(Math.random() * this.template.length)]
    );
  },
  reset() {
    this.selectedIdx = [];
    this.numbers = [];
    this.score = 0;
    this.status = "PLAYING";
  },
  validate() {
    if (
      this.currentTarget < this.target &&
      this.selectedIdx.length < this.maxCount &&
      this.numbers.length <= this.maxLength
    ) {
      // Still playing
      return;
    }

    this.status = "LOST";
  },
  checkTarget() {
    if (
      this.currentTarget === this.target &&
      this.selectedIdx.length >= this.minCount &&
      this.selectedIdx.length <= this.maxCount &&
      this.numbers.length <= this.maxLength
    ) {
      this.score++;
      this.removeSelection();
    }
  },
  selectIndex(idx, toggle = false) {
    if (!this.selectedIdx.includes(idx)) {
      this.selectedIdx.push(idx);
    } else if (toggle) {
      this.selectedIdx = this.selectedIdx.filter(item => item !== idx);
    }
  },
  removeSelection() {
    this.numbers = this.numbers.filter(
      (_, idx) => !this.selectedIdx.includes(idx)
    );
    this.selectedIdx.length = 0;
  },
}));

Alpine.start();
