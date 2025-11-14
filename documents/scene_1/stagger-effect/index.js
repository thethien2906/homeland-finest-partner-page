import { createTimeline, utils, stagger } from '../../dist/modules/index.js';

const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
const fragment = document.createDocumentFragment();
const rows = +utils.get(document.body, '--rows');
const grid = [rows, rows];
const numberOfElements = rows * rows;

// Tính toán vị trí trung tâm của lưới
const centerRow = Math.floor(rows / 2);
const centerCol = Math.floor(rows / 2);
const centerIndex = centerRow * rows + centerCol;

// Tạo các dots
for (let i = 0; i < numberOfElements; i++) {
  const dotEl = document.createElement('div');
  dotEl.classList.add('dot');
  fragment.appendChild(dotEl);
}

staggerVisualizerEl.appendChild(fragment);

var animation;

function animateGrid() {
  if (animation) animation.pause();

  animation = createTimeline({
    defaults: {
      ease: 'inOutQuad',
    },
    onComplete: animateGrid
  })
  .add('.dot', {
    keyframes: [
      {
        x: stagger('-.175rem', {grid, from: centerIndex, axis: 'x'}),
        y: stagger('-.175rem', {grid, from: centerIndex, axis: 'y'}),
        duration: 200
      }, {
        x: stagger('.125rem', {grid, from: centerIndex, axis: 'x'}),
        y: stagger('.125rem', {grid, from: centerIndex, axis: 'y'}),
        scale: 2,
        duration: 500
      }, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 600,
      }
    ],
    delay: stagger(50, {grid, from: centerIndex}),
  })
}

animateGrid();

