# Kế Hoạch Thực Thi Scene 2: Phân rã Cấu trúc Nón lá (Deconstructing the Nón Lá)

## 📋 Tổng Quan

**Mục tiêu:** Tạo một scene scroll-based phức tạp, "phân rã" (deconstruct) Nón lá thành 5 thành phần cấu tạo, chuyển đổi từ trạng thái "huyền ảo/năng lượng" (Scene 1) sang "kỹ thuật/phân tích" (technical blueprint) thông qua hiệu ứng wireframe và callout lines.

**Thời gian ước tính:** 8-12 giờ

**Độ phức tạp:** Cao - Rất cao

**Trigger:** Scroll-based (100% điều khiển bằng scroll position)

---

## 🎯 Yêu Cầu Chức Năng

### 1. Mô hình 3D Nón lá
- **5 file `.glb` riêng biệt** cho 5 bộ phận của nón lá:
  - `vanh-non.glb` - Vành nón (Rim)
  - `la-non.glb` - Lá nón (Leaves)
  - `khung-non.glb` - Khung nón (Frame)
  - `suon-non.glb` - Sườn nón (Ribs - 6 thanh)
  - `quai-non.glb` - Quai nón (Strap)
- **Cấu trúc:** Load 5 model riêng biệt và **xếp chồng lên nhau** (positioning) để tạo thành nón lá hoàn chỉnh
- **Initial state:** 5 model được đặt ở vị trí ban đầu để tạo thành nón lá hoàn chỉnh
- **Exploded view:** Khi scroll, 5 model tách ra theo trục Y (exploded view animation)
- 2 set vật liệu: Realistic (PBR textures) và Wireframe (MeshBasicMaterial + Wireframe)
- Camera control: Zoom out, Pan up, Tilt
- Animation: Tách lớp (exploded view), xoay, chuyển đổi vật liệu

### 2. Scroll-triggered Timeline
- 6 phases được điều khiển hoàn toàn bằng scroll position
- GSAP ScrollTrigger với `scrub: true` để "tua" animation
- Smooth transitions giữa các phases

### 3. Hiệu ứng Illumination Reveal
- Luồng ánh sáng quét dọc theo sườn nón và vành nón
- Spotlight hoặc light beam animation

### 4. Technical Blueprint Switch
- Chuyển đổi vật liệu từ Realistic sang Wireframe
- Background transition từ đen sang sáng (trắng/xám nhạt)
- Visual style shift hoàn toàn

### 5. Callout Lines & Text Labels
- SVG hoặc CSS lines từ vật thể ra 2 góc màn hình
- Text labels với typewriter hoặc fade in effect
- 2 nhóm: Góc trên-phải và góc dưới-trái

---

## 🏗️ Cấu Trúc Component

```
src/
├── components/
│   └── Scene2/
│       ├── Scene2.jsx              # Component chính
│       ├── Scene2.css              # Styles cho Scene 2
│       ├── Rim3D.jsx               # Component Vành nón (vanh-non.glb)
│       ├── Leaves3D.jsx            # Component Lá nón (la-non.glb)
│       ├── Frame3D.jsx             # Component Khung nón (khung-non.glb)
│       ├── Ribs3D.jsx              # Component Sườn nón (suon-non.glb)
│       ├── Strap3D.jsx             # Component Quai nón (quai-non.glb)
│       ├── IlluminationEffect.jsx  # Component hiệu ứng ánh sáng quét
│       ├── CalloutLines.jsx        # Component callout lines và text labels
│       └── BlueprintTransition.jsx # Component chuyển đổi wireframe & background
```

---

## 📝 Các Bước Thực Thi Chi Tiết

### **Bước 1: Setup Component Structure** (45 phút)

#### 1.1. Tạo thư mục và file cơ bản
- [ ] Tạo thư mục `src/components/Scene2/`
- [ ] Tạo file `Scene2.jsx`
- [ ] Tạo file `Scene2.css`
- [ ] Tạo file `Rim3D.jsx` - Component Vành nón
- [ ] Tạo file `Leaves3D.jsx` - Component Lá nón
- [ ] Tạo file `Frame3D.jsx` - Component Khung nón
- [ ] Tạo file `Ribs3D.jsx` - Component Sườn nón
- [ ] Tạo file `Strap3D.jsx` - Component Quai nón
- [ ] Tạo file `IlluminationEffect.jsx`
- [ ] Tạo file `CalloutLines.jsx`
- [ ] Tạo file `BlueprintTransition.jsx`

#### 1.2. Setup layout cơ bản
- [ ] Container full screen (100vh)
- [ ] Background màu đen (#000) ban đầu
- [ ] Three.js Canvas setup
- [ ] GSAP ScrollTrigger setup
- [ ] Z-index layering: 3D Model → Illumination → Callouts

---

### **Bước 2: Implement Mô hình 3D Nón lá** (3 giờ)

#### 2.1. Tạo 5 components riêng biệt cho từng bộ phận

**Yêu cầu kỹ thuật:**
- Tạo **5 components riêng biệt**, mỗi component load 1 file `.glb`:
  - `Rim3D.jsx` - Load `vanh-non.glb` (Vành nón)
  - `Leaves3D.jsx` - Load `la-non.glb` (Lá nón)
  - `Frame3D.jsx` - Load `khung-non.glb` (Khung nón)
  - `Ribs3D.jsx` - Load `suon-non.glb` (Sườn nón)
  - `Strap3D.jsx` - Load `quai-non.glb` (Quai nón)
- **Initial positioning:** Mỗi component có initial position để **xếp chồng lên nhau** tạo thành nón lá hoàn chỉnh
- **Exploded view:** Khi scroll, mỗi component di chuyển position theo trục Y
- Setup 2 set vật liệu: Realistic và Wireframe cho mỗi component
- Mỗi component expose ref để Scene2.jsx control animation

**Implementation Pattern (cho mỗi component):**
```jsx
// Rim3D.jsx structure (tương tự cho các component khác)
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function Rim3D({ isWireframe, ...props }) {
  const rimRef = useRef()
  const { scene } = useGLTF('/models/vanh-non.glb')
  
  // Setup materials (Realistic và Wireframe)
  // Initial positioning
  // Expose ref để Scene2 control animation
  
  return (
    <primitive 
      ref={rimRef}
      object={scene.clone()} 
      position={[0, 0, 0]} // Initial position
      {...props}
    />
  )
}

// Tương tự cho Leaves3D, Frame3D, Ribs3D, Strap3D
```

**Lợi ích của cấu trúc này:**
- ✅ Code modular, dễ maintain
- ✅ Mỗi component có logic riêng (materials, animations)
- ✅ Dễ debug và test từng bộ phận
- ✅ Có thể tái sử dụng components
- ✅ Scene2.jsx chỉ cần import và sử dụng, control animation qua refs

**Tham số từ Storyboard:**
- Phase 1: Camera zoom out nhẹ
- Phase 2: Camera pan up, nón tilt (xoay trục X)
- Phase 3: Nón nghiêng 45° (chóp hướng 10h, vành hướng 4h)
- Rotation speeds:
  - Rim: Xoay đều, ổn định
  - Leaves: Xoay nhẹ, bồng bềnh
  - Frame & Ribs: Xoay ngược chiều nhau
  - Strap: Xoay uốn lượn mềm mại

**Checklist:**
- [ ] Tạo 5 components riêng biệt:
  - [ ] `Rim3D.jsx` - Load `vanh-non.glb` thành công
  - [ ] `Leaves3D.jsx` - Load `la-non.glb` thành công
  - [ ] `Frame3D.jsx` - Load `khung-non.glb` thành công
  - [ ] `Ribs3D.jsx` - Load `suon-non.glb` thành công
  - [ ] `Strap3D.jsx` - Load `quai-non.glb` thành công
- [ ] Mỗi component có initial position để xếp chồng tạo nón lá hoàn chỉnh
- [ ] Mỗi component setup Realistic materials (PBR textures)
- [ ] Mỗi component setup Wireframe materials (MeshBasicMaterial + wireframe: true)
- [ ] Mỗi component expose ref để Scene2.jsx control animation
- [ ] Camera setup với initial position phù hợp (trong Scene2.jsx)
- [ ] Test 5 components hiển thị đúng và xếp chồng tạo thành nón lá hoàn chỉnh

---

### **Bước 3: Implement Scroll-triggered Timeline** (2.5 giờ)

#### 3.1. GSAP Timeline với ScrollTrigger

**Yêu cầu kỹ thuật:**
- Timeline với 6 phases tương ứng với scroll position
- `scrub: true` để animation dừng khi ngừng scroll
- Smooth transitions giữa phases
- Tính toán scroll distance cho mỗi phase

**Phase Breakdown (từ Storyboard):**

**Phase 1: The Ret-con Reveal (0-10% scroll)**
- [ ] Camera zoom out nhẹ
- [ ] Map 3D và ripple fade out
- [ ] Vòng tròn Scene 1 trở thành Vành nón (visual continuity)

**Phase 2: The Tilt & Separation (10-30% scroll)**
- [ ] Camera pan up
- [ ] Nón tilt (xoay trục X)
- [ ] Exploded view: 5 lớp tách ra dọc trục Y
  - Rim: Trượt xuống dưới
  - Leaves: Nhấc lên cao
  - Frame & Ribs: Bung ra giữa
  - Strap: Fade in + Scale up ở dưới vành

**Phase 3: The Orbital Spin (30-60% scroll)**
- [ ] Nón nghiêng 45° (chóp 10h, vành 4h)
- [ ] Camera lock ở góc nhìn song song
- [ ] Mỗi bộ phận xoay quanh trục riêng:
  - Rim: Xoay đều
  - Leaves: Xoay nhẹ, bồng bềnh
  - Frame & Ribs: Xoay ngược chiều
  - Strap: Xoay uốn lượn

**Phase 4: The Illumination (60-80% scroll)**
- [ ] Ambient light giảm độ sáng
- [ ] Light beam xuất hiện và quét:
  - Dọc theo 1 thanh sườn từ đỉnh xuống
  - Chạm vành nón
  - Quét 1 vòng quanh chu vi vành

**Phase 5: The Blueprint Switch (80-90% scroll)**
- [ ] Material swap: Realistic → Wireframe
- [ ] Background transition: Đen → Sáng
- [ ] Contrast giảm (flat, clean blueprint style)

**Phase 6: The Callouts (90-100% scroll)**
- [ ] Callout lines vẽ từ vật thể ra 2 góc
- [ ] Text labels fade in hoặc typewriter
- [ ] Nón xoay chậm hoặc dừng ở góc đẹp

**Implementation:**
```jsx
// Scene2.jsx - GSAP Timeline setup
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Scene2() {
  const sceneRef = useRef(null)
  const timelineRef = useRef(null)
  
  useEffect(() => {
    // Setup timeline với 6 phases
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sceneRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true, // Pin scene trong viewport
      }
    })
    
    // Phase 1: Ret-con Reveal
    tl.to(cameraRef.current.position, {
      z: '+2', // Zoom out
      duration: 1
    })
    
    // Phase 2: Tilt & Separation
    tl.to(hatRef.current.rotation, {
      x: Math.PI * 0.25, // Tilt
      duration: 2
    }, '-=0.5')
    tl.to(rimRef.current.position, {
      y: '-1', // Rim xuống
      duration: 1
    }, '-=1.5')
    // ... các bộ phận khác
    
    // Phase 3: Orbital Spin
    tl.to(hatRef.current.rotation, {
      x: Math.PI * 0.25,
      y: Math.PI * 0.25, // Nghiêng 45°
      duration: 2
    })
    // Rotation animations cho từng bộ phận
    
    // Phase 4: Illumination
    // Light beam animation
    
    // Phase 5: Blueprint Switch
    tl.to(materialRef.current, {
      opacity: 0, // Fade out realistic
      duration: 0.5
    })
    tl.to(wireframeRef.current, {
      opacity: 1, // Fade in wireframe
      duration: 0.5
    }, '-=0.5')
    tl.to(backgroundRef.current, {
      backgroundColor: '#f5f5f5', // Nền sáng
      duration: 1
    }, '-=0.5')
    
    // Phase 6: Callouts
    // Callout lines và text animation
    
    return () => {
      timelineRef.current?.kill()
    }
  }, [])
  
  return <div ref={sceneRef} className="scene2-container">...</div>
}
```

**Checklist:**
- [ ] GSAP ScrollTrigger setup và register plugin
- [ ] Timeline với 6 phases
- [ ] Scroll distance calculation cho mỗi phase
- [ ] Camera animations (zoom, pan, tilt)
- [ ] Exploded view separation
- [ ] Rotation animations
- [ ] Material swap transition
- [ ] Background transition
- [ ] Test scroll scrub mượt mà

---

### **Bước 4: Implement Illumination Effect** (1.5 giờ)

#### 4.1. Tạo component IlluminationEffect.jsx

**Yêu cầu kỹ thuật:**
- Spotlight hoặc light beam quét dọc theo sườn nón
- Quét quanh chu vi vành nón
- Timing: Phase 4 (60-80% scroll)

**Implementation:**
```jsx
// IlluminationEffect.jsx structure
- Sử dụng Three.js SpotLight hoặc DirectionalLight
- Animate light position theo path:
  1. Dọc theo 1 thanh sườn từ đỉnh xuống
  2. Chạm vành nón
  3. Quét quanh chu vi vành (360°)
- GSAP animation trong timeline Phase 4
- Ambient light giảm độ sáng khi light beam xuất hiện
```

**Checklist:**
- [ ] Setup Spotlight hoặc DirectionalLight
- [ ] Tính toán path animation (dọc sườn → vành → quét vòng)
- [ ] Ambient light dimming
- [ ] Timing sync với Phase 4
- [ ] Visual effect rõ ràng, không quá chói

---

### **Bước 5: Implement Blueprint Transition** (1.5 giờ)

#### 5.1. Tạo component BlueprintTransition.jsx

**Yêu cầu kỹ thuật:**
- Material swap: Realistic → Wireframe
- Background transition: Đen → Sáng
- Visual style shift hoàn toàn
- Timing: Phase 5 (80-90% scroll)

**Implementation:**
```jsx
// BlueprintTransition.jsx structure
- Material swap:
  - Realistic materials fade out (opacity: 1 → 0)
  - Wireframe materials fade in (opacity: 0 → 1)
  - Sử dụng MeshBasicMaterial với wireframe: true
  - Hoặc EdgesGeometry để chỉ hiển thị edges quan trọng
- Background transition:
  - Body hoặc container background: #000 → #f5f5f5
  - CSS transition hoặc GSAP animation
- Contrast adjustment:
  - Giảm độ tương phản
  - Flat, clean blueprint style
```

**Technical Notes:**
- Nếu model có quá nhiều polygons, sử dụng `EdgesGeometry` thay vì `wireframe: true` để tránh rối mắt
- Background transition có thể dùng overlay div với opacity animation

**Checklist:**
- [ ] Material swap animation (fade out/in)
- [ ] Wireframe materials setup
- [ ] Background transition (đen → sáng)
- [ ] Contrast adjustment
- [ ] Timing sync với Phase 5
- [ ] Visual style shift rõ ràng

---

### **Bước 6: Implement Callout Lines & Text** (2 giờ)

#### 6.1. Tạo component CalloutLines.jsx

**Yêu cầu kỹ thuật:**
- SVG hoặc CSS lines từ vật thể ra 2 góc màn hình
- Text labels với typewriter hoặc fade in
- 2 nhóm: Góc trên-phải và góc dưới-trái
- Timing: Phase 6 (90-100% scroll)

**Implementation:**
```jsx
// CalloutLines.jsx structure
- Sử dụng SVG <line> hoặc CSS pseudo-elements
- Tính toán vị trí 3D → 2D screen coordinates:
  - Sử dụng Three.js Vector3.project() để convert 3D position sang screen coordinates
  - Vẽ line từ screen position đến góc màn hình
- 2 nhóm callouts:
  - Nhóm 1 (Góc trên-phải):
    - Lines từ Leaves, Frame, Ribs
    - Text: [PLACEHOLDER_TITLE_1], [placeholder_desc_1]
  - Nhóm 2 (Góc dưới-trái):
    - Lines từ Strap, Rim
    - Text: [PLACEHOLDER_TITLE_2], [placeholder_desc_2]
- Animation:
  - Lines vẽ từ vật thể ra (stroke-dasharray animation)
  - Text fade in hoặc typewriter effect
```

**Technical Notes:**
- Sử dụng `useFrame` để update screen coordinates mỗi frame (vì vật thể 3D có thể xoay)
- SVG lines có thể dùng `stroke-dasharray` và `stroke-dashoffset` để tạo hiệu ứng vẽ
- Text có thể dùng GSAP TextPlugin hoặc custom typewriter effect

**Checklist:**
- [ ] Tính toán 3D → 2D screen coordinates
- [ ] SVG hoặc CSS lines setup
- [ ] Line drawing animation (stroke-dasharray)
- [ ] Text labels với placeholder content
- [ ] Text fade in hoặc typewriter effect
- [ ] 2 nhóm callouts (góc trên-phải, góc dưới-trái)
- [ ] Timing sync với Phase 6
- [ ] Responsive positioning

---

### **Bước 7: Tích Hợp Vào Scene2 Component** (1 giờ)

#### 7.1. Tạo Scene2.jsx chính

**Yêu cầu:**
- Import và sử dụng tất cả sub-components (5 components 3D + effects)
- Quản lý GSAP timeline và ScrollTrigger
- Control animation của 5 components thông qua refs
- Layout và styling
- Transition từ Scene 1

**Implementation:**
```jsx
// Scene2.jsx structure
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Rim3D from './Rim3D'
import Leaves3D from './Leaves3D'
import Frame3D from './Frame3D'
import Ribs3D from './Ribs3D'
import Strap3D from './Strap3D'
import IlluminationEffect from './IlluminationEffect'
import CalloutLines from './CalloutLines'
import BlueprintTransition from './BlueprintTransition'

function Scene2() {
  // Refs cho 5 components
  const rimRef = useRef()
  const leavesRef = useRef()
  const frameRef = useRef()
  const ribsRef = useRef()
  const strapRef = useRef()
  
  // GSAP timeline setup với refs
  // Control animation của từng component qua refs
  
  return (
    <div className="scene2-container">
      <Canvas>
        <Rim3D ref={rimRef} />
        <Leaves3D ref={leavesRef} />
        <Frame3D ref={frameRef} />
        <Ribs3D ref={ribsRef} />
        <Strap3D ref={strapRef} />
        <IlluminationEffect />
      </Canvas>
      <BlueprintTransition />
      <CalloutLines 
        rimRef={rimRef}
        leavesRef={leavesRef}
        frameRef={frameRef}
        ribsRef={ribsRef}
        strapRef={strapRef}
      />
    </div>
  )
}
```

**Checklist:**
- [ ] Import tất cả 5 components 3D (Rim3D, Leaves3D, Frame3D, Ribs3D, Strap3D)
- [ ] Import các effect components (IlluminationEffect, CalloutLines, BlueprintTransition)
- [ ] Tạo refs cho 5 components 3D
- [ ] GSAP timeline integration với refs để control animation
- [ ] Layout với z-index đúng thứ tự
- [ ] Container full screen (100vh)
- [ ] Background transition setup
- [ ] Transition từ Scene 1 (visual continuity)
- [ ] Scroll trigger setup

---

### **Bước 8: Styling và Responsive** (1 giờ)

#### 8.1. Scene2.css

**Yêu cầu:**
- Full screen layout
- Background transition (đen → sáng)
- Callout lines và text positioning
- Responsive cho mobile và desktop

**Checklist:**
- [ ] Container full screen (100vh, 100vw)
- [ ] Background: #000 → #f5f5f5 (transition)
- [ ] Callout lines và text positioning
- [ ] Z-index layering đúng
- [ ] Responsive breakpoints (mobile < 768px, tablet 768-1024px, desktop > 1024px)
- [ ] Text responsive sizing
- [ ] Callout lines responsive positioning
- [ ] Test trên các kích thước màn hình

---

### **Bước 9: Tích Hợp Vào App.jsx** (30 phút)

#### 9.1. Thêm Scene2 vào App

**Checklist:**
- [ ] Import Scene2 component
- [ ] Thêm Scene2 vào App.jsx (sau Scene1)
- [ ] Đảm bảo scroll transition mượt mà từ Scene 1
- [ ] Lenis smooth scroll compatibility
- [ ] Test scroll trigger hoạt động đúng

---

### **Bước 10: Testing và Tối Ưu** (1 giờ)

#### 10.1. Testing

**Checklist:**
- [ ] Test scroll timeline và phases
- [ ] Test trên các trình duyệt (Chrome, Firefox, Safari)
- [ ] Test responsive trên mobile
- [ ] Test performance (FPS, memory)
- [ ] Test loading time của file .glb
- [ ] Kiểm tra không có lỗi console
- [ ] Test scroll scrub mượt mà
- [ ] Test material swap transition
- [ ] Test callout lines positioning

#### 10.2. Tối Ưu

**Checklist:**
- [ ] Optimize file .glb (nếu cần)
- [ ] Lazy load components nếu cần
- [ ] Optimize animation performance
- [ ] Kiểm tra và fix memory leaks
- [ ] Optimize re-renders
- [ ] Optimize Three.js rendering (frustum culling, LOD nếu cần)
- [ ] Optimize wireframe rendering (EdgesGeometry nếu model phức tạp)

---

## 🎨 Chi Tiết Kỹ Thuật

### 📚 Tham Khảo Từ Storyboard

#### Phase Breakdown Chi Tiết:

**Phase 1: The Ret-con Reveal (0-10% scroll)**
- Camera zoom out nhẹ từ vị trí Scene 1
- Map 3D và ripple fade out
- Vòng tròn Scene 1 trở thành Vành nón (visual continuity)
- Duration: ~10% scroll distance

**Phase 2: The Tilt & Separation (10-30% scroll)**
- Camera pan up
- Toàn bộ nón (5 models) tilt (xoay trục X) để lộ hình chóp
- Exploded view: 5 models tách ra theo trục Y (di chuyển position):
  - Rim (vanh-non): Trượt xuống dưới (y: -1)
  - Leaves (la-non): Nhấc lên cao (y: +1.5)
  - Frame (khung-non): Bung ra giữa (y: +0.5)
  - Ribs (suon-non): Bung ra giữa (y: +0.3)
  - Strap (quai-non): Fade in + Scale up ở dưới vành (y: -1.2, opacity: 0 → 1, scale: 0 → 1)
- Duration: ~20% scroll distance

**Phase 3: The Orbital Spin (30-60% scroll)**
- Toàn bộ nón (5 models) nghiêng 45° (chóp 10h, vành 4h)
  - Rotation X: ~0.25π (45°)
  - Rotation Y: ~0.25π (45°)
- Camera lock ở góc nhìn song song
- Rotation animations cho từng model độc lập:
  - Rim (vanh-non): Xoay đều quanh trục Y (speed: 0.5 rad/s)
  - Leaves (la-non): Xoay nhẹ, bồng bềnh (speed: 0.3 rad/s, có sin wave)
  - Frame (khung-non): Xoay ngược chiều (speed: -0.4 rad/s)
  - Ribs (suon-non): Xoay ngược chiều (speed: 0.4 rad/s)
  - Strap (quai-non): Xoay uốn lượn (speed: 0.2 rad/s, có sin wave)
- Duration: ~30% scroll distance

**Phase 4: The Illumination (60-80% scroll)**
- Ambient light giảm độ sáng (intensity: 1.0 → 0.5)
- Light beam xuất hiện:
  - Dọc theo 1 thanh sườn từ đỉnh xuống (duration: 0.5s)
  - Chạm vành nón (duration: 0.2s)
  - Quét 1 vòng quanh chu vi vành (duration: 1s)
- Duration: ~20% scroll distance

**Phase 5: The Blueprint Switch (80-90% scroll)**
- Material swap cho tất cả 5 models:
  - Realistic materials fade out (opacity: 1 → 0, duration: 0.5s)
  - Wireframe materials fade in (opacity: 0 → 1, duration: 0.5s)
- Background transition:
  - Background: #000 → #f5f5f5 (duration: 1s)
- Contrast adjustment:
  - Giảm độ tương phản
  - Flat, clean blueprint style
- Duration: ~10% scroll distance

**Phase 6: The Callouts (90-100% scroll)**
- 5 models xoay chậm hoặc dừng ở góc đẹp
- Callout lines vẽ từ các models ra 2 góc:
  - Nhóm 1 (Góc trên-phải): Lines từ Leaves (la-non), Frame (khung-non), Ribs (suon-non)
  - Nhóm 2 (Góc dưới-trái): Lines từ Strap (quai-non), Rim (vanh-non)
- Text labels fade in hoặc typewriter:
  - [PLACEHOLDER_TITLE_1], [placeholder_desc_1]
  - [PLACEHOLDER_TITLE_2], [placeholder_desc_2]
- Duration: ~10% scroll distance

### Thư Viện Sử Dụng

1. **Three.js + React Three Fiber** (đã cài đặt)
   - Load và hiển thị mô hình 3D
   - Camera control
   - Material và lighting
   - Wireframe rendering

2. **GSAP + ScrollTrigger** (đã cài đặt)
   - Timeline animation
   - Scroll-based scrubbing
   - Material và background transitions

3. **@react-three/drei** (nếu cần)
   - useGLTF hook
   - Helpers và utilities

### File Assets Cần Thiết

- [ ] `public/models/vanh-non.glb` - Vành nón (Rim)
- [ ] `public/models/la-non.glb` - Lá nón (Leaves)
- [ ] `public/models/khung-non.glb` - Khung nón (Frame)
- [ ] `public/models/suon-non.glb` - Sườn nón (Ribs - 6 thanh)
- [ ] `public/models/quai-non.glb` - Quai nón (Strap)

**Lưu ý:**
- **5 file .glb riêng biệt** cho 5 bộ phận
- **Initial positioning:** 5 models cần được đặt ở vị trí ban đầu để **xếp chồng lên nhau** tạo thành nón lá hoàn chỉnh
- **Vật liệu:** Mỗi model cần có 2 set vật liệu: Realistic (PBR textures) và Wireframe (MeshBasicMaterial)
- **Scale:** Đảm bảo tất cả models có scale phù hợp để khi xếp chồng tạo thành nón lá hoàn chỉnh

### Tham Số Animation (Sẽ được điền vào Hyperparameters.md)

**Camera:**
- Initial Position: [0, 0, 5] (từ Scene 1)
- Zoom Out: z: +2
- Pan Up: y: +1
- Tilt: x rotation: 0 → 0.25π

**Exploded View:**
- Rim: y: 0 → -1
- Leaves: y: 0 → +1.5
- Frame: y: 0 → +0.5
- Ribs: y: 0 → +0.3
- Strap: y: 0 → -1.2, opacity: 0 → 1, scale: 0 → 1

**Rotation:**
- Rim: 0.5 rad/s (đều)
- Leaves: 0.3 rad/s (bồng bềnh)
- Frame: -0.4 rad/s (ngược)
- Ribs: 0.4 rad/s (ngược)
- Strap: 0.2 rad/s (uốn lượn)

**Illumination:**
- Light beam path: Dọc sườn → Vành → Quét vòng
- Duration: ~1.7s total

**Material Swap:**
- Fade duration: 0.5s
- Background transition: 1s

**Callouts:**
- Line drawing duration: 0.5s per line
- Text fade in: 0.5s

---

## ✅ Checklist Tổng Hợp

### Setup
- [ ] Tạo cấu trúc thư mục components/Scene2
- [ ] Tạo các file component cơ bản (5 components 3D + effects)
- [ ] Setup layout và styling cơ bản
- [ ] GSAP ScrollTrigger setup

### Mô hình 3D (5 Components riêng biệt)
- [ ] Tạo Rim3D.jsx - Load vanh-non.glb thành công
- [ ] Tạo Leaves3D.jsx - Load la-non.glb thành công
- [ ] Tạo Frame3D.jsx - Load khung-non.glb thành công
- [ ] Tạo Ribs3D.jsx - Load suon-non.glb thành công
- [ ] Tạo Strap3D.jsx - Load quai-non.glb thành công
- [ ] Mỗi component setup Realistic materials
- [ ] Mỗi component setup Wireframe materials
- [ ] Mỗi component có initial position để xếp chồng
- [ ] Mỗi component expose ref để Scene2 control
- [ ] Camera setup và control (trong Scene2.jsx)

### Scroll Timeline
- [ ] Phase 1: Ret-con Reveal
- [ ] Phase 2: Tilt & Separation
- [ ] Phase 3: Orbital Spin
- [ ] Phase 4: Illumination
- [ ] Phase 5: Blueprint Switch
- [ ] Phase 6: Callouts

### Illumination Effect
- [ ] Light beam setup
- [ ] Path animation (sườn → vành → quét vòng)
- [ ] Ambient light dimming
- [ ] Timing sync

### Blueprint Transition
- [ ] Material swap animation
- [ ] Background transition
- [ ] Contrast adjustment
- [ ] Visual style shift

### Callout Lines
- [ ] 3D → 2D coordinate conversion
- [ ] SVG/CSS lines setup
- [ ] Line drawing animation
- [ ] Text labels
- [ ] 2 nhóm callouts

### Tích Hợp
- [ ] Import 5 components 3D vào Scene2.jsx
- [ ] Tạo refs cho 5 components
- [ ] GSAP timeline integration với refs
- [ ] Layout và z-index đúng
- [ ] Tích hợp vào App.jsx
- [ ] Transition từ Scene 1

### Styling & Responsive
- [ ] Container full screen
- [ ] Background transition
- [ ] Callout positioning
- [ ] Responsive breakpoints
- [ ] Text responsive sizing

### Testing & Tối Ưu
- [ ] Test scroll timeline
- [ ] Test responsive
- [ ] Test performance
- [ ] Optimize code

---

## 📊 Timeline Ước Tính

| Bước | Thời Gian | Mức Độ Ưu Tiên |
|------|-----------|----------------|
| 1. Setup Component Structure | 45 phút | Cao |
| 2. Mô hình 3D Nón lá | 3 giờ | Cao |
| 3. Scroll-triggered Timeline | 2.5 giờ | Cao |
| 4. Illumination Effect | 1.5 giờ | Trung bình |
| 5. Blueprint Transition | 1.5 giờ | Trung bình |
| 6. Callout Lines & Text | 2 giờ | Trung bình |
| 7. Tích Hợp Scene2 | 1 giờ | Cao |
| 8. Styling & Responsive | 1 giờ | Trung bình |
| 9. Tích Hợp vào App | 30 phút | Cao |
| 10. Testing & Tối Ưu | 1 giờ | Trung bình |
| **Tổng** | **8-12 giờ** | |

---

## 🚀 Bắt Đầu Implementation

**Thứ tự ưu tiên:**
1. Setup cấu trúc cơ bản (Bước 1)
2. Load và setup mô hình 3D (Bước 2) - Có thể test ngay
3. Implement scroll timeline cơ bản (Bước 3) - Phức tạp nhất
4. Implement các effects (Bước 4-6)
5. Tích hợp và hoàn thiện (Bước 7-10)

**Lưu ý:**
- Cần có 5 file .glb riêng biệt: `vanh-non.glb`, `la-non.glb`, `khung-non.glb`, `suon-non.glb`, `quai-non.glb`
- Quan trọng: 5 models cần được đặt ở vị trí ban đầu để xếp chồng tạo thành nón lá hoàn chỉnh
- Có thể implement và test từng phase độc lập
- Nên test thường xuyên để phát hiện lỗi sớm
- Có thể điều chỉnh timing và tham số trong quá trình implement
- Scroll distance cho mỗi phase có thể cần fine-tune

---

## 📝 Ghi Chú Bổ Sung

- Scene 2 là scroll-based, 100% điều khiển bằng scroll position
- Tất cả animation được "scrub" theo scroll (dừng khi ngừng scroll)
- Scene 2 kết thúc ở trạng thái "blueprint" với callout lines đã hiển thị
- Người dùng scroll để chuyển sang Scene 3 (sẽ implement sau)
- Visual continuity với Scene 1 rất quan trọng (vòng tròn → vành nón)

---

## 🔑 Điểm Quan Trọng Khi Implement

### 3D Model Setup:
1. **File structure:** 
   - **5 file .glb riêng biệt** cho 5 bộ phận:
     - `vanh-non.glb` - Vành nón
     - `la-non.glb` - Lá nón
     - `khung-non.glb` - Khung nón
     - `suon-non.glb` - Sườn nón
     - `quai-non.glb` - Quai nón
   - Load từng file riêng biệt bằng `useGLTF` hook
   - **Initial positioning:** Đặt 5 models ở vị trí ban đầu để **xếp chồng lên nhau** tạo thành nón lá hoàn chỉnh
   - **Exploded view:** Khi scroll, di chuyển position của từng model để tách ra
2. **Materials:** Chuẩn bị 2 set vật liệu cho mỗi model (Realistic và Wireframe)
3. **Positioning:** Quan trọng - 5 models cần được đặt ở vị trí chính xác để khi xếp chồng tạo thành nón lá hoàn chỉnh

### GSAP Timeline:
1. **Scroll distance:** Tính toán kỹ scroll distance cho mỗi phase
2. **Scrub:** Sử dụng `scrub: true` để animation dừng khi ngừng scroll
3. **Pin:** Có thể cần `pin: true` để ghim scene trong viewport
4. **Timing:** Đảm bảo timing giữa các phases mượt mà

### Performance:
1. **Wireframe:** Nếu model phức tạp, dùng `EdgesGeometry` thay vì `wireframe: true`
2. **LOD:** Có thể cần Level of Detail cho mobile
3. **Frustum culling:** Đảm bảo Three.js chỉ render những gì trong view

### Visual Continuity:
1. **Scene 1 → Scene 2:** Vòng tròn Scene 1 phải trở thành Vành nón một cách tự nhiên
2. **Camera transition:** Camera zoom out phải mượt mà từ Scene 1
3. **Timing:** Đảm bảo không có gap giữa Scene 1 và Scene 2

---

**Ngày tạo:** 2024
**Phiên bản:** 1.0
**Trạng thái:** 📝 **KẾ HOẠCH** - Chờ implementation

