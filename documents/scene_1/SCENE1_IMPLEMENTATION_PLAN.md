# Kế Hoạch Thực Thi Scene 1: Intro Reveal

## 📋 Tổng Quan

**Mục tiêu:** Tạo màn hình intro reveal ấn tượng với các vòng tròn SVG, hiệu ứng dots, và bản đồ Việt Nam 3D với ripple effect.

**Thời gian ước tính:** 4-6 giờ

**Độ phức tạp:** Trung bình - Cao

---

## 🎯 Yêu Cầu Chức Năng

### 1. Vòng Tròn SVG
- **Vòng tròn trong:** Nét đứt mảnh, dựng đứng, tự vẽ + quay theo chiều kim đồng hồ
- **Vòng tròn ngoài:** 5 nét đứt dài, đường cung, tự vẽ (sau 1 nhịp) + quay chậm hơn

### 2. Hiệu Ứng Dots Staggering
- 20 dots ở tâm
- Lan toả từ tâm: Scale tăng → Opacity giảm → Biến mất
- Stagger delay giữa các dots

### 3. Bản Đồ 3D Việt Nam
- Load file `.glb` từ `public/models/vn-map.glb`
- Hiển thị ở trung tâm, fade in sau khi vòng tròn bắt đầu
- Scale animation từ 0.8 → 1

### 4. Ripple Effect
- Hiệu ứng sóng liên tục phát ra từ tâm bản đồ
- 3 vòng tròn đồng tâm
- Lặp lại mỗi 2 giây

---

## 🏗️ Cấu Trúc Component

```
src/
├── components/
│   └── Scene1/
│       ├── Scene1.jsx              # Component chính
│       ├── Scene1.css              # Styles cho Scene 1
│       ├── CircleAnimation.jsx     # Component vòng tròn SVG
│       ├── DotsStagger.jsx         # Component dots staggering
│       └── Map3D.jsx                # Component bản đồ 3D với ripple
```

---

## 📝 Các Bước Thực Thi Chi Tiết

### **Bước 1: Setup Component Structure** (30 phút)

#### 1.1. Tạo thư mục và file cơ bản
- [ ] Tạo thư mục `src/components/Scene1/`
- [ ] Tạo file `Scene1.jsx`
- [ ] Tạo file `Scene1.css`
- [ ] Tạo file `CircleAnimation.jsx`
- [ ] Tạo file `DotsStagger.jsx`
- [ ] Tạo file `Map3D.jsx`

#### 1.2. Setup layout cơ bản
- [ ] Container full screen (100vh)
- [ ] Background màu đen (#000)
- [ ] Căn giữa nội dung (flexbox hoặc absolute positioning)
- [ ] Z-index layering: SVG circles → Dots → 3D Map

---

### **Bước 2: Implement Vòng Tròn SVG** (1.5 giờ)

#### 2.1. Tạo component CircleAnimation.jsx

**Yêu cầu kỹ thuật:**
- Sử dụng SVG với `<g>` groups chứa `<line>` và `<path>` elements
- Stroke-dasharray và stroke-dashoffset cho hiệu ứng vẽ (dùng Anime.js)
- Transform rotate cho animation quay (dùng manual animation với requestAnimationFrame)

**Tham số từ Hyperparameter.md:**
- Inner Circle:
  - Draw Duration: 2s (stagger animation)
  - Rotation Speed: 30s (full rotation)
  - Direction: Clockwise
- Outer Circle:
  - Draw Delay: 0.5s  
  - Draw Duration: 2.5s (stagger animation)
  - Rotation Speed: 45s (full rotation, slower)

**Implementation:**
```jsx
// CircleAnimation.jsx structure
- useRef cho SVG elements và groups
- useEffect với:
  1. Anime.js cho stroke-dashoffset (draw effect)
  2. Manual animation với requestAnimationFrame cho rotation
     - Sử dụng SVG transform attribute: rotate(angle, centerX, centerY)
     - Center point: (200, 200) - center của viewBox "0 0 400 400"
     - Sử dụng performance.now() cho độ chính xác cao
- SVG viewBox: "0 0 400 400"
- Inner circle: 60 vertical bars (lines)
- Outer circle: 6 dash strokes (paths)
```

**Technical Notes:**
- **Rotation Implementation**: Sử dụng SVG transform attribute thay vì CSS transform để tránh drift issue
- **Transform Origin**: Fixed center point (200, 200) trong SVG coordinate system
- **Animation Loop**: Sử dụng modulo để loop rotation từ 0° đến 360°
- **Performance**: Sử dụng `performance.now()` thay vì `Date.now()` cho độ chính xác cao hơn
- **CSS**: Không sử dụng CSS transform properties để tránh conflict với SVG transform

**Checklist:**
- [x] Tạo SVG container với viewBox "0 0 400 400"
- [x] Vòng tròn trong: 60 vertical bars (lines) tạo động
- [x] Vòng tròn ngoài: 6 dash strokes (paths) tạo động
- [x] Anime.js animation cho stroke-dashoffset (draw effect)
- [x] Manual animation với requestAnimationFrame cho rotation
- [x] Sử dụng SVG transform attribute để tránh drift
- [x] Đảm bảo timing đúng (inner trước, outer sau delay)
- [x] Test trên các kích thước màn hình khác nhau

---

### **Bước 3: Implement Dots Staggering Effect** (1 giờ)

#### 3.1. Tạo component DotsStagger.jsx

**Yêu cầu kỹ thuật:**
- Grid layout với nhiều dots (13×13 grid, dynamic số lượng)
- Dots được sắp xếp trong grid và nằm trong inner circle
- Animation 3 giai đoạn: Co lại → Giãn nở → Trở về và fade out
- Fade in sau khi inner circle hoàn thành
- Animation bắt đầu sau khi outer circle hoàn thành
- **Tham khảo từ:** `documents/scene_1/stagger-effect/`

**Tham số thực tế (đã implement):**
- Grid Size: 13×13 (169 vị trí, chỉ lấy dots trong inner circle)
- Dot Size: 2px
- Gap: 25px
- Fade In: Bắt đầu sau 1100ms (inner circle complete), duration 500ms
- Animation 3 giai đoạn: Bắt đầu sau 2900ms (outer circle complete)
- Phase 1: 400ms (co lại về tâm)
- Phase 2: 300ms (giãn nở mạnh)
- Phase 3: 500ms (trở về và fade out)
- Stagger Delay: 50ms per Manhattan distance unit

**Implementation Pattern (từ ví dụ):**
```jsx
// DotsStagger.jsx structure
// Tham khảo từ stagger-effect/index.js

import { useEffect, useRef } from 'react';
import anime from 'animejs';

function DotsStagger() {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  
  useEffect(() => {
    // Tạo 20 dots
    const dots = [];
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      containerRef.current.appendChild(dot);
      dotsRef.current.push(dot);
    }
    
    // Tính toán center index (tương tự ví dụ)
    const centerIndex = Math.floor(20 / 2);
    
    // Anime.js animation với stagger từ center
    // Pattern tương tự ví dụ nhưng đơn giản hóa cho 20 dots
    anime({
      targets: '.dot',
      scale: [0, 2, 0],
      opacity: [1, 1, 0],
      delay: anime.stagger(100, { 
        from: 'center', // Lan toả từ trung tâm
        grid: [20, 1], // 20 dots trong 1 hàng (hoặc có thể là grid 5x4)
        axis: 'x' // Hoặc 'y' tùy layout
      }),
      duration: 1500,
      easing: 'easeInOutQuad'
    });
    
    return () => {
      // Cleanup
      dotsRef.current.forEach(dot => dot.remove());
    };
  }, []);
  
  return <div ref={containerRef} className="dots-stagger-container" />;
}
```

**Cách tính toán vị trí dots (tham khảo ví dụ):**
- Ví dụ dùng grid 41x41 với centerIndex = centerRow * rows + centerCol
- Cho Scene 1: Có thể dùng grid 5x4 (20 dots) hoặc 1 hàng 20 dots
- Hoặc đơn giản: 20 dots xếp thành vòng tròn quanh tâm

**Checklist:**
- [x] Tạo grid layout với dots (13×13 grid, dynamic số lượng)
- [x] Position dots ở trung tâm màn hình (grid layout trong inner circle)
- [x] Tính toán Manhattan distance từ center để phân lớp
- [x] Fade in animation sau khi inner circle hoàn thành
- [x] Visibility control (hidden → visible khi fade in)
- [x] Animation 3 giai đoạn với translateX/Y và scale
- [x] Phase 1: Co lại về tâm (translate về center, scale: 1 → 0.5)
- [x] Phase 2: Giãn nở mạnh (translate ra ngoài, scale: 0.5 → 2.5)
- [x] Phase 3: Trở về và fade out (translate về 0, scale: 2.5 → 0, opacity: 1 → 0)
- [x] Stagger delay dựa trên Manhattan distance (50ms per unit)
- [x] Timing đúng (đợi outer circle hoàn thành trước khi bắt đầu animation)
- [x] Easing: `easeInQuad`, `easeOutQuad`, `easeInOutQuad` cho từng phase
- [x] Dots fade out sau khi animation hoàn thành

---

### **Bước 4: Implement Bản Đồ 3D với Ripple** (2 giờ)

#### 4.1. Tạo component Map3D.jsx

**Yêu cầu kỹ thuật:**
- Load file `.glb` sử dụng `@react-three/drei` (useGLTF)
- Hiển thị ở trung tâm
- Fade in animation
- Scale animation từ 0.8 → 1

**Tham số từ Hyperparameter.md:**
- Fade In Delay: 1.5s (sau khi circles bắt đầu)
- Fade In Duration: 1.5s
- Scale Start: 0.8
- Scale End: 1
- Position: Center

**Implementation:**
```jsx
// Map3D.jsx structure
- Sử dụng @react-three/fiber Canvas
- useGLTF hook để load vn-map.glb
- GSAP hoặc Three.js animation cho:
  - Opacity fade in
  - Scale animation
- Position camera để map ở center
```

**Checklist:**
- [ ] Load file `public/models/vn-map.glb`
- [ ] Setup Three.js scene với camera phù hợp
- [ ] Fade in animation (delay 1.5s, duration 1.5s)
- [ ] Scale animation từ 0.8 → 1
- [ ] Map hiển thị ở trung tâm
- [ ] Material và lighting phù hợp

#### 4.2. Implement Ripple Effect

**Yêu cầu kỹ thuật:**
- 3 vòng tròn đồng tâm
- Phát ra từ tâm bản đồ
- Lặp lại liên tục
- **Tham khảo từ:** `documents/scene_1/ripple-effect/`

**Tham số từ Hyperparameter.md:**
- Ripple Interval: 2s (mỗi 2 giây)
- Ripple Duration: 2s
- Ripple Count: 3 (concentric circles)
- Ripple Scale End: 3
- Ripple Opacity Start: 0.6
- Ripple Opacity End: 0

**Implementation Pattern (từ ví dụ):**
```jsx
// Ripple effect trong Map3D.jsx
// Tham khảo từ ripple-effect/index.js nhưng chuyển sang Three.js

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RingGeometry } from 'three';
import gsap from 'gsap';

function RippleEffect() {
  const ringsRef = useRef([]);
  const rippleAnimations = useRef([]);
  
  useEffect(() => {
    // Tạo 3 ring geometries (tương tự ví dụ tạo DOM elements)
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new RingGeometry(1, 1.1, 64);
      rings.push(ring);
    }
    ringsRef.current = rings;
    
    // Function tạo ripple (tương tự createRipple() trong ví dụ)
    function createRipple(ringIndex) {
      const ring = ringsRef.current[ringIndex];
      const mesh = /* get mesh reference */;
      
      // Reset về trạng thái ban đầu
      mesh.scale.set(1, 1, 1);
      mesh.material.opacity = 0.6;
      
      // Animation (tương tự ví dụ nhưng dùng GSAP cho Three.js)
      const scaleAnim = gsap.to(mesh.scale, {
        x: 3, y: 3, z: 3,
        duration: 2, // 2000ms như Hyperparameter.md
        ease: 'power2.out', // Tương đương 'out(2)' trong ví dụ
        onComplete: () => {
          mesh.scale.set(1, 1, 1);
        }
      });
      
      const opacityAnim = gsap.to(mesh.material, {
        opacity: 0,
        duration: 2,
        ease: 'power2.out'
      });
      
      rippleAnimations.current.push({ scaleAnim, opacityAnim });
    }
    
    // Bắt đầu ripple ngay lập tức (như ví dụ)
    rings.forEach((_, index) => {
      setTimeout(() => createRipple(index), index * 300); // Stagger 0.3s
    });
    
    // Loop với interval 2s (như ví dụ dùng setInterval)
    const intervalId = setInterval(() => {
      rings.forEach((_, index) => {
        setTimeout(() => createRipple(index), index * 300);
      });
    }, 2000);
    
    return () => {
      clearInterval(intervalId);
      rippleAnimations.current.forEach(anim => {
        anim.scaleAnim.kill();
        anim.opacityAnim.kill();
      });
    };
  }, []);
  
  // Render 3 rings
  return (
    <>
      {ringsRef.current.map((ring, index) => (
        <mesh key={index} geometry={ring}>
          <meshBasicMaterial 
            transparent 
            opacity={0.6}
            color="#ffffff"
          />
        </mesh>
      ))}
    </>
  );
}
```

**So sánh với ví dụ:**
- Ví dụ: DOM elements, scale từ 0 → MAX_SIZE/50, opacity 0.8 → 0, duration 4000ms, interval 1000ms
- Scene 1: Three.js rings, scale từ 1 → 3, opacity 0.6 → 0, duration 2000ms, interval 2000ms
- Pattern tương tự: Tạo elements động, animate, tự động cleanup

**Checklist:**
- [ ] Tạo 3 ring geometries trong Three.js (tương tự tạo DOM elements trong ví dụ)
- [ ] Position ở tâm bản đồ (0, 0, 0)
- [ ] Function `createRipple()` tương tự ví dụ
- [ ] Scale animation từ 1 → 3 (duration 2s)
- [ ] Opacity animation từ 0.6 → 0 (duration 2s)
- [ ] Easing: `power2.out` (tương đương `out(2)` trong ví dụ)
- [ ] Loop animation với `setInterval` (2s) - pattern từ ví dụ
- [ ] Stagger giữa 3 vòng tròn (0.3s delay mỗi ring)
- [ ] Tự động reset và cleanup (như ví dụ)
- [ ] Material phù hợp (transparent, có thể dùng shader material)

---

### **Bước 5: Tích Hợp Vào Scene1 Component** (30 phút)

#### 5.1. Tạo Scene1.jsx chính

**Yêu cầu:**
- Import và sử dụng tất cả sub-components
- Quản lý timing và sequencing
- Layout và styling

**Implementation:**
```jsx
// Scene1.jsx structure
import CircleAnimation from './CircleAnimation'
import DotsStagger from './DotsStagger'
import Map3D from './Map3D'

function Scene1() {
  return (
    <div className="scene1-container">
      <CircleAnimation />
      <DotsStagger />
      <Map3D />
    </div>
  )
}
```

**Checklist:**
- [ ] Import tất cả components
- [ ] Layout với z-index đúng thứ tự
- [ ] Container full screen (100vh)
- [ ] Background màu đen
- [ ] Căn giữa tất cả elements
- [ ] Đảm bảo timing sequence đúng

---

### **Bước 6: Styling và Responsive** (30 phút)

#### 6.1. Scene1.css

**Yêu cầu:**
- Full screen layout
- Background đen
- Căn giữa nội dung
- Responsive cho mobile và desktop

**Checklist:**
- [ ] Container full screen (100vh, 100vw)
- [ ] Background: #000
- [ ] Flexbox hoặc absolute positioning để căn giữa
- [ ] Z-index layering đúng
- [ ] Responsive breakpoints
- [ ] Test trên các kích thước màn hình

---

### **Bước 7: Tích Hợp Vào App.jsx** (15 phút)

#### 7.1. Thêm Scene1 vào App

**Checklist:**
- [ ] Import Scene1 component
- [ ] Thêm Scene1 vào App.jsx
- [ ] Đảm bảo Scene1 là scene đầu tiên
- [ ] Test auto-play khi tải trang
- [ ] Kiểm tra scroll transition sang Scene 2 (nếu có)

---

### **Bước 8: Testing và Tối Ưu** (30 phút)

#### 8.1. Testing

**Checklist:**
- [ ] Test animation timing và sequencing
- [ ] Test trên các trình duyệt (Chrome, Firefox, Safari)
- [ ] Test responsive trên mobile
- [ ] Test performance (FPS, memory)
- [ ] Test loading time của file .glb
- [ ] Kiểm tra không có lỗi console

#### 8.2. Tối Ưu

**Checklist:**
- [ ] Optimize file .glb (nếu cần)
- [ ] Lazy load components nếu cần
- [ ] Optimize animation performance
- [ ] Kiểm tra và fix memory leaks
- [ ] Optimize re-renders

---

## 🎨 Chi Tiết Kỹ Thuật

### 📚 Tham Khảo Từ Ví Dụ

#### 1. Stagger Effect Reference (`documents/scene_1/stagger-effect/`)

**Đặc điểm từ ví dụ:**
- Grid layout với dots lan toả từ trung tâm
- Sử dụng stagger function với `from: centerIndex`
- Animation có 3 keyframes:
  1. Di chuyển ra ngoài (x, y với stagger)
  2. Scale lên (scale: 2)
  3. Về vị trí ban đầu (x: 0, y: 0, scale: 1)
- Delay stagger: 50ms giữa các elements
- Easing: `inOutQuad`

**Áp dụng cho Scene 1:**
- Thay vì grid 41x41, chỉ cần 20 dots ở tâm
- Tính toán vị trí trung tâm (centerIndex)
- Sử dụng Anime.js với stagger function tương tự
- Animation: Scale từ 0 → 2, Opacity từ 1 → 0
- Stagger delay: 0.1s (100ms) giữa mỗi dot

**Code Pattern Reference:**
```javascript
// Từ ví dụ stagger-effect/index.js
const centerIndex = centerRow * rows + centerCol;
animation = createTimeline({
  defaults: { ease: 'inOutQuad' },
  onComplete: animateGrid
})
.add('.dot', {
  keyframes: [
    { scale: 2, duration: 500 },
    { scale: 1, duration: 600 }
  ],
  delay: stagger(50, {grid, from: centerIndex})
})
```

**Chuyển đổi sang Anime.js:**
```javascript
// Cho Scene 1 - 20 dots ở tâm
anime({
  targets: '.dot',
  scale: [0, 2, 0],
  opacity: [1, 1, 0],
  delay: anime.stagger(100, {from: 'center'}),
  duration: 1500,
  easing: 'easeInOutQuad'
})
```

#### 2. Ripple Effect Reference (`documents/scene_1/ripple-effect/`)

**Đặc điểm từ ví dụ:**
- Tạo ripple elements động (DOM elements)
- Scale từ 0 → MAX_RIPPLE_SIZE/50
- Opacity từ 0.8 → 0
- Duration: 4000ms (4 giây)
- Interval: 1000ms (1 giây) - tạo ripple mới
- Tự động xóa element sau khi animation hoàn thành
- Easing: `out(2)`

**Áp dụng cho Scene 1:**
- Thay vì DOM elements, sử dụng Three.js RingGeometry
- Scale từ 1 → 3 (theo Hyperparameter.md)
- Opacity từ 0.6 → 0
- Duration: 2000ms (2 giây) - theo Hyperparameter.md
- Interval: 2000ms (2 giây) - theo Hyperparameter.md
- 3 vòng tròn đồng tâm với stagger

**Code Pattern Reference:**
```javascript
// Từ ví dụ ripple-effect/index.js
function createRipple() {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.transform = 'scale(0)';
  container.appendChild(ripple);
  
  const animation = animate(ripple, {
    scale: { from: 0, to: MAX_RIPPLE_SIZE/50, duration: 4000, ease: 'out(2)' },
    opacity: { from: 0.8, to: 0, duration: 4000, ease: 'out(2)' },
    onComplete: () => ripple.remove()
  });
}

setInterval(() => createRipple(), 1000);
```

**Chuyển đổi sang Three.js + GSAP:**
```javascript
// Cho Scene 1 - 3 vòng tròn đồng tâm
function createRipple(ringRef, index) {
  gsap.fromTo(ringRef.current.scale, 
    { x: 1, y: 1, z: 1 },
    {
      x: 3, y: 3, z: 3,
      duration: 2,
      delay: index * 0.3, // Stagger giữa 3 vòng tròn
      ease: 'power2.out',
      onComplete: () => {
        ringRef.current.scale.set(1, 1, 1);
      }
    }
  );
  
  gsap.fromTo(ringRef.current.material,
    { opacity: 0.6 },
    {
      opacity: 0,
      duration: 2,
      delay: index * 0.3,
      ease: 'power2.out'
    }
  );
}

// Loop với interval 2s
useEffect(() => {
  const interval = setInterval(() => {
    rings.forEach((ring, index) => createRipple(ring, index));
  }, 2000);
  return () => clearInterval(interval);
}, []);
```

### Thư Viện Sử Dụng

1. **Anime.js** (đã cài đặt)
   - Vòng tròn SVG animation
   - Dots staggering effect (tham khảo từ ví dụ)

2. **Three.js + React Three Fiber** (đã cài đặt)
   - Load và hiển thị bản đồ 3D
   - Ripple effect 3D (tham khảo từ ví dụ, chuyển đổi sang Three.js)

3. **GSAP** (đã cài đặt)
   - Fade in/scale của map
   - Ripple effect animation (có thể dùng thay cho Three.js animation)

### File Assets Cần Thiết

- [x] `public/models/vn-map.glb` - Đã có trong project

### Tham Số Animation (Từ Hyperparameter.md)

**Vòng Tròn:**
- Inner Circle Draw: 300ms duration + 15ms × 59 bars = ~1185ms (Anime.js stagger animation)
- Inner Circle Rotate: 30s (continuous, manual animation với requestAnimationFrame)
- Outer Circle Draw Delay: 200ms (sau inner circle hoàn thành)
- Outer Circle Draw: 1500ms total (250ms × 6 dashes) - reduced from 2500ms
- Outer Circle Rotate: 45s (continuous, manual animation với requestAnimationFrame)
- **Note**: Rotation sử dụng SVG transform attribute `rotate(angle, 200, 200)` để tránh drift issue

**Dots:**
- Grid: 13×13 grid, dynamic số lượng dots (tất cả dots trong inner circle)
- Dot Size: 2px
- Gap: 25px
- Fade In: Bắt đầu sau 1100ms, duration 500ms
- Animation 3 Giai Đoạn: Bắt đầu sau 2900ms (outer circle complete)
  - Phase 1: 400ms (co lại về tâm, scale: 1 → 0.5)
  - Phase 2: 300ms (giãn nở mạnh, scale: 0.5 → 2.5)
  - Phase 3: 500ms (trở về và fade out, scale: 2.5 → 0, opacity: 1 → 0)
- Stagger Delay: 50ms per Manhattan distance unit
- Total Animation Duration: 1200ms per dot (có stagger)

**Map 3D:**
- Fade In Delay: 1.5s
- Fade In Duration: 1.5s
- Scale: 0.8 → 1

**Ripple:**
- Interval: 2s
- Duration: 2s
- Count: 3 circles
- Scale: 1 → 3
- Opacity: 0.6 → 0

---

## ✅ Checklist Tổng Hợp

### Setup
- [x] Tạo cấu trúc thư mục components/Scene1
- [x] Tạo các file component cơ bản
- [x] Setup layout và styling cơ bản

### Vòng Tròn SVG
- [x] Tạo CircleAnimation component
- [x] Implement inner circle với draw (Anime.js) + rotate (manual animation)
- [x] Implement outer circle với draw (Anime.js) + rotate (manual animation)
- [x] Fix drift issue bằng cách sử dụng SVG transform attribute
- [x] Sử dụng performance.now() cho độ chính xác animation
- [x] Timing và sequencing đúng (outer circle nhanh hơn: 1500ms thay vì 2500ms)

### Dots Staggering
- [x] Tạo DotsStagger component
- [x] Tạo grid layout với dynamic số lượng dots (13×13 grid)
- [x] Implement fade in animation sau inner circle
- [x] Implement animation 3 giai đoạn (co lại → giãn nở → trở về và fade out)
- [x] Scale và translate animation với stagger delay
- [x] Visibility control để tránh flash
- [x] Timing đồng bộ với CircleAnimation

### Bản Đồ 3D
- [ ] Tạo Map3D component
- [ ] Load file .glb
- [ ] Fade in animation
- [ ] Scale animation
- [ ] Position ở center

### Ripple Effect
- [ ] Tạo 3 ring geometries
- [ ] Implement scale animation
- [ ] Implement opacity animation
- [ ] Loop với interval 2s
- [ ] Stagger giữa các vòng tròn

### Tích Hợp
- [x] Tích hợp tất cả vào Scene1.jsx
- [x] Layout và z-index đúng
- [x] Tích hợp vào App.jsx
- [x] Test auto-play

### Testing & Tối Ưu
- [ ] Test trên nhiều trình duyệt
- [ ] Test responsive
- [ ] Test performance
- [ ] Fix bugs nếu có
- [ ] Optimize code

---

## 📊 Timeline Ước Tính

| Bước | Thời Gian | Mức Độ Ưu Tiên |
|------|-----------|----------------|
| 1. Setup Component Structure | 30 phút | Cao |
| 2. Vòng Tròn SVG | 1.5 giờ | Cao |
| 3. Dots Staggering | 1 giờ | Trung bình |
| 4. Bản Đồ 3D + Ripple | 2 giờ | Cao |
| 5. Tích Hợp Scene1 | 30 phút | Cao |
| 6. Styling & Responsive | 30 phút | Trung bình |
| 7. Tích Hợp vào App | 15 phút | Cao |
| 8. Testing & Tối Ưu | 30 phút | Trung bình |
| **Tổng** | **4-6 giờ** | |

---

## 🚀 Bắt Đầu Implementation

**Thứ tự ưu tiên:**
1. Setup cấu trúc cơ bản (Bước 1)
2. Implement vòng tròn SVG (Bước 2) - Có thể test ngay
3. Implement dots staggering (Bước 3) - Có thể test ngay
4. Implement bản đồ 3D (Bước 4) - Phức tạp nhất
5. Tích hợp và hoàn thiện (Bước 5-8)

**Lưu ý:**
- Có thể implement và test từng component độc lập
- Nên test thường xuyên để phát hiện lỗi sớm
- Có thể điều chỉnh timing và tham số trong quá trình implement

---

## 📝 Ghi Chú Bổ Sung

- Scene 1 là auto-play, không cần scroll trigger
- Tất cả animation chạy tự động khi component mount
- Scene 1 kết thúc ở trạng thái "nghỉ" với ripple effect liên tục
- Người dùng scroll để chuyển sang Scene 2 (sẽ implement sau)

---

## 🔑 Điểm Quan Trọng Khi Implement (Từ Ví Dụ)

### Stagger Effect:
1. **Tính toán center index:** Sử dụng pattern `centerRow * rows + centerCol` (hoặc đơn giản hơn với `from: 'center'` trong Anime.js)
2. **Stagger delay:** Sử dụng `anime.stagger(100, {from: 'center'})` để lan toả từ trung tâm
3. **Keyframes:** Có thể dùng 3 keyframes (0 → 2 → 0) như ví dụ để tạo hiệu ứng mượt hơn
4. **Easing:** `easeInOutQuad` tạo cảm giác tự nhiên

### Ripple Effect:
1. **Pattern tạo elements động:** Tạo elements trong function `createRipple()`, không tạo sẵn
2. **setInterval pattern:** Sử dụng `setInterval` để tạo ripple mới liên tục
3. **Cleanup quan trọng:** Luôn cleanup interval và animations khi component unmount
4. **Reset state:** Reset scale và opacity về giá trị ban đầu trước mỗi animation
5. **Stagger giữa các rings:** Delay 0.3s giữa mỗi ring để tạo hiệu ứng sóng
6. **Easing:** `power2.out` (GSAP) tương đương `out(2)` trong ví dụ

### Chuyển Đổi Từ Ví Dụ Sang React + Three.js:
- Ví dụ dùng DOM elements → Scene 1 dùng Three.js geometries
- Ví dụ dùng custom animation library → Scene 1 dùng Anime.js/GSAP
- Pattern logic giữ nguyên: Tạo elements động, animate, cleanup
- Timing và easing có thể điều chỉnh theo Hyperparameter.md

---

**Ngày tạo:** $(date)
**Phiên bản:** 3.0 (Đã cập nhật với implementation thực tế)
**Trạng thái:** Step 1, 2, 3 đã hoàn thành. Step 4 đang trong quá trình.

---

## 📝 Ghi Chú Implementation Thực Tế

### Thay Đổi So Với Kế Hoạch Ban Đầu:

#### Dots Staggering (Step 3):
- **Thay đổi từ**: 20 dots cố định, animation đơn giản (scale + opacity)
- **Thành**: Grid 13×13 với dynamic số lượng dots, animation 3 giai đoạn phức tạp
- **Lý do**: Tạo hiệu ứng sóng xung kích từ tâm ra ngoài, phù hợp với yêu cầu thiết kế

#### Timing Adjustments:
- **Outer Circle**: Giảm từ 2500ms xuống 1500ms để hoàn thành nhanh hơn
- **Dots Fade In**: Thêm fade in animation sau inner circle hoàn thành
- **Animation Start**: Đợi outer circle hoàn thành (2900ms) thay vì bắt đầu ngay

#### Grid Layout:
- **Grid Size**: Tăng từ 5×4 lên 13×13 để có nhiều dots hơn
- **Dot Size**: Giảm từ 4px xuống 2px để fit nhiều dots trong inner circle
- **Gap**: Điều chỉnh từ 50px xuống 25px để grid dày hơn

#### Animation Pattern:
- **Thay đổi từ**: Stagger đơn giản với scale và opacity
- **Thành**: Animation 3 giai đoạn với translateX/Y, scale, và opacity
- **Pattern**: Co lại → Giãn nở → Trở về và fade out (tạo hiệu ứng sóng xung kích)

### Files Đã Tạo/Chỉnh Sửa:
- ✅ `src/components/Scene1/CircleAnimation.jsx` - Hoàn thành
- ✅ `src/components/Scene1/CircleAnimation.css` - Hoàn thành
- ✅ `src/components/Scene1/DotsStagger.jsx` - Hoàn thành với animation 3 giai đoạn
- ✅ `src/components/Scene1/DotsStagger.css` - Hoàn thành
- ✅ `src/components/Scene1/Scene1.jsx` - Hoàn thành
- ✅ `src/components/Scene1/Scene1.css` - Hoàn thành
- ⏳ `src/components/Scene1/Map3D.jsx` - Đang implement (structure đã có, cần animation)
- ⏳ `src/components/Scene1/Map3D.css` - Đã có

### Next Steps:
1. Hoàn thành Map3D fade in và scale animation
2. Implement Ripple Effect trong Map3D
3. Testing và fine-tuning timing
4. Responsive design adjustments (nếu cần)

