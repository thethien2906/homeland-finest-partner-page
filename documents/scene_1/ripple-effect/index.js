import { animate } from '../../dist/modules/index.js';

const container = document.getElementById('rippleContainer');

let rippleAnimations = [];
let intervalId = null;

// Kích thước hình chữ nhật
const RECTANGLE_WIDTH = 600;
const RECTANGLE_HEIGHT = 400;
// Kích thước tối đa của ripple (đường chéo của hình chữ nhật)
const MAX_RIPPLE_SIZE = Math.sqrt(RECTANGLE_WIDTH * RECTANGLE_WIDTH + RECTANGLE_HEIGHT * RECTANGLE_HEIGHT);

// Tạo một ripple mới
function createRipple() {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  
  // Đặt vị trí ban đầu ở giữa container
  ripple.style.width = '100px';
  ripple.style.height = '100px';
  ripple.style.opacity = '1';
  ripple.style.transform = 'scale(0)';
  
  container.appendChild(ripple);
  
  // Tạo animation cho ripple - chậm hơn và giới hạn trong hình chữ nhật
  const animation = animate(ripple, {
    scale: {
      from: 0,
      to: MAX_RIPPLE_SIZE / 50, // Scale dựa trên đường chéo của hình chữ nhật
      duration: 4000, // Tăng từ 2000ms lên 4000ms để chậm hơn
      ease: 'out(2)'
    },
    opacity: {
      from: 0.8,
      to: 0,
      duration: 4000, // Tăng từ 2000ms lên 4000ms để chậm hơn
      ease: 'out(2)'
    },
    onComplete: () => {
      // Xóa ripple sau khi animation hoàn thành
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
      // Xóa animation khỏi mảng
      const index = rippleAnimations.indexOf(animation);
      if (index > -1) {
        rippleAnimations.splice(index, 1);
      }
    }
  });
  
  rippleAnimations.push(animation);
  return animation;
}

// Bắt đầu tạo ripple liên tục
function startRipples() {
  // Tạo ripple đầu tiên ngay lập tức
  createRipple();
  
  // Tạo ripple mới mỗi 1000ms (tăng từ 400ms lên 1000ms để chậm hơn)
  intervalId = setInterval(() => {
    createRipple();
  }, 1000);
}

// Tự động bắt đầu khi trang load
window.addEventListener('load', () => {
  setTimeout(() => {
    startRipples();
  }, 500);
});

