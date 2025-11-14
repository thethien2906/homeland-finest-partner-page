# Hyperparameter - Thông Số Kỹ Thuật Dự Án

> File này chứa tất cả các thông số kỹ thuật được sử dụng trong dự án.  
> Các giá trị này có thể được điều chỉnh để fine-tune animation và performance.

---

## 📐 Typography

### Font Family
- **Primary Font**: `Inter` (Google Fonts)
  - Lý do: Hỗ trợ tốt tiếng Việt, modern, clean
  - Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  - Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`

### Font Sizes
- **Hero Title (Scene 1)**: `4rem` (64px)
- **Section Title**: `2.5rem` (40px)
- **Subtitle**: `1.5rem` (24px)
- **Body Text**: `1rem` (16px)
- **Small Text**: `0.875rem` (14px)
- **Callout Labels**: `1.125rem` (18px)

### Font Weights
- **Headings**: `600` (SemiBold)
- **Body**: `400` (Regular)
- **Emphasis**: `500` (Medium)
- **Strong**: `700` (Bold)

---

## 🎨 Colors

### Background Colors
- **Dark Background**: `#000000` (Black)
- **Light Background (Wireframe)**: `#F5F5F5` (Light Gray)
- **Canvas Background**: `#000000`

### Text Colors
- **Primary Text (Dark BG)**: `#FFFFFF` (White)
- **Primary Text (Light BG)**: `#000000` (Black)
- **Secondary Text**: `#CCCCCC` (Light Gray)
- **Accent Text**: `#FFD700` (Gold - tạm thời)

### UI Elements
- **Callout Lines**: `#FFFFFF` (White, opacity: 0.6)
- **Wireframe Stroke**: `#333333` (Dark Gray)
- **Ripple Effect**: `#4A90E2` (Blue, opacity: 0.3)

---

## 🎬 Animation Timing

### Scene 1: Intro Reveal (Auto-play)

#### Circle Animations
- **Inner Circle Draw Duration**: `2s`
- **Inner Circle Rotation Speed**: `30s` (full rotation)
- **Outer Circle Draw Delay**: `0.5s`
- **Outer Circle Draw Duration**: `2.5s`
- **Outer Circle Rotation Speed**: `45s` (full rotation, slower)
- **Rotation Direction**: Clockwise

#### Dots Staggering Effect
- **Total Dots**: `20`
- **Stagger Delay**: `0.1s` (between each dot)
- **Scale Start**: `0`
- **Scale End**: `2`
- **Scale Duration**: `1.5s`
- **Opacity Fade Duration**: `1s`
- **Total Effect Duration**: `3s`

#### Map 3D Reveal
- **Fade In Delay**: `1.5s` (after circles start)
- **Fade In Duration**: `1.5s`
- **Scale Start**: `0.8`
- **Scale End**: `1`
- **Position**: Center

#### Ripple Effect
- **Ripple Interval**: `2s` (every 2 seconds)
- **Ripple Duration**: `2s`
- **Ripple Count**: `3` (concentric circles)
- **Ripple Scale End**: `3`
- **Ripple Opacity Start**: `0.6`
- **Ripple Opacity End**: `0`

---

### Scene 2: Deconstructing Nón Lá (Scroll-controlled)

#### Transition from Scene 1
- **Camera Zoom Out Duration**: `1s` (scrubbed)
- **Zoom Out Distance**: `2` units
- **Transition Smoothness**: `0.1` (scrub smooth)

#### Tilt & Reveal
- **Tilt Rotation (X-axis)**: `0° → 45°`
- **Tilt Duration**: `2s` (scrubbed)
- **Camera Pan Up**: `1.5` units
- **Pan Duration**: `2s` (scrubbed)

#### Deconstruct (Layer Separation)
- **Total Separation Distance**: `3` units (along Z-axis)
- **Separation Duration**: `3s` (scrubbed)
- **Layer Order** (timing):
  - Vành nón: `0s` (start)
  - Lá nón: `0.2s`
  - Khung nón: `0.4s`
  - Sườn nón: `0.6s`
  - Quai nón: `0.8s`

#### Stabilize & Rotate
- **Stabilize Duration**: `1s` (scrubbed)
- **Final Tilt Angle**: `45°`
- **Individual Rotation Speeds**:
  - Vành: `20s` (full rotation)
  - Lá: `25s` (wind-like, variable)
  - Khung: `15s` (counter-clockwise)
  - Sườn: `18s` (counter-clockwise)
  - Quai: `22s` (clockwise)

#### Illumination Reveal
- **Sweep Duration**: `2s` (scrubbed)
- **Light Intensity**: `2.0`
- **Light Color**: `#FFFFFF`

#### Technical Switch (Wireframe)
- **Wireframe Transition Duration**: `1.5s` (scrubbed)
- **Wireframe Stroke Width**: `1px`
- **Background Fade Duration**: `1.5s` (scrubbed)
- **Background Target**: `#F5F5F5`

#### Callouts
- **Callout Lines Delay**: `0.5s` (after wireframe)
- **Callout Lines Draw Duration**: `1s`
- **Text Labels Fade In**: `1s`
- **Text Labels Delay**: `0.3s` (after lines)

---

### Scene 3: Reformation & Text Reveal Slot (Scroll-controlled)

#### Callout Retraction
- **Retraction Duration**: `1.5s` (scrubbed)
- **Fade Out Duration**: `1s` (scrubbed)

#### Layer Collapse
- **Collapse Duration**: `2.5s` (scrubbed)
- **Z-axis Reduction**: `3 → 0.5` units
- **Move to Center Duration**: `2.5s` (scrubbed)

#### 90° Tilt
- **Tilt Duration**: `2s` (scrubbed)
- **Final Angle**: `90°` (from left side)
- **Rotation Axis**: Y-axis

#### Exit Wireframe
- **Wireframe Fade Duration**: `1.5s` (scrubbed)
- **Stroke Opacity**: `1 → 0`
- **Material Transition**: `1.5s` (scrubbed)

#### Background Crossfade
- **Crossfade Duration**: `1.5s` (scrubbed)
- **From**: `#F5F5F5`
- **To**: `#000000`

#### Create Slot
- **Camera Pull Back Duration**: `1.5s` (scrubbed)
- **Zoom Out Distance**: `1.5` units
- **Slot Gap**: `2` units (vertical)

---

### Scene 4: Interior World Reveal (Scroll-controlled)

#### Text Fade-out
- **Fade Duration**: `1s` (scrubbed)
- **Opacity**: `1 → 0`

#### Tilt & Hide
- **Tilt Duration**: `2s` (scrubbed)
- **Rotation (X-axis)**: `0° → 180°`
- **Quai Fade Out Delay**: `1s` (when hidden)
- **Quai Fade Duration**: `0.5s`

#### Full Flip (180°)
- **Total Flip Duration**: `2s` (scrubbed)
- **Final Rotation**: `180°` (upside down)

#### Camera Enter
- **Camera Move Duration**: `2.5s` (scrubbed)
- **Camera Move Up**: `2` units
- **Camera Move Forward**: `3` units
- **Easing**: `power2.inOut`

#### FOV Change
- **FOV Start**: `75°`
- **FOV End**: `50°`
- **FOV Change Duration**: `2.5s` (scrubbed)

#### Model Simplify
- **Vành Fade Out**: `1s` (scrubbed, starts at 1s)
- **Khung Fade Out**: `1.2s` (scrubbed, starts at 1.2s)
- **Fade Duration**: `1s`

---

### Scene 5: Interior Carousel (Pinned, Scroll-controlled)

#### Pin Settings
- **Pin Duration**: Full scene height
- **Virtual Height**: `600vh` (6 sectors × 100vh)
- **Pin Spacing**: `0` (no gap)

#### Camera Lock
- **Camera Position**: Fixed
- **Camera Angle**: Top-down `5°`
- **Camera Distance**: `5` units
- **Camera FOV**: `50°`

#### Initial Rotate
- **Rotation to Sector 1**: `0° → 0°` (already centered)
- **Duration**: `0.5s` (auto, not scrubbed)

#### Scrubbed Rotation
- **Rotation per Sector**: `60°` (360° / 6 sectors)
- **Total Rotation Range**: `0° → 360°`
- **Scroll Sensitivity**: `1:1` (direct mapping)
- **Smooth Factor**: `0.1` (scrub smooth)

#### Sector Snapping
- **Snap Threshold**: `5vh` (within 5vh of target)
- **Snap Duration**: `0.3s`
- **Snap Easing**: `power2.out`

#### Sector Transitions
- **Fade Out Duration**: `0.5s`
- **Fade In Duration**: `0.5s`
- **Scale Effect**: `1.03 → 1.00`
- **Scale Duration**: `0.5s`

#### Sector Content
- **Sector 1 Position**: `0°`
- **Sector 2 Position**: `60°`
- **Sector 3 Position**: `120°`
- **Sector 4 Position**: `180°`
- **Sector 5 Position**: `240°`
- **Sector 6 Position**: `300°`

---

### Scene 6: Exit Interior (Scroll-controlled)

#### Unpin & Retreat
- **Unpin Duration**: `0.5s`
- **Object Retreat Distance**: `5` units (Z-axis)
- **Retreat Duration**: `2s` (scrubbed)
- **Scale Reduction**: `1 → 0.7`

#### Flip (Mirror X-Rotation)
- **Rotation Duration**: `2.5s` (scrubbed)
- **Rotation Range**: `180° → 0°`
- **Easing**: `power2.inOut`

#### Strap Reveal (Quai nón)
- **Slide In Delay**: `1.5s` (at 70-80% of flip)
- **Slide In Duration**: `1s`
- **Slide Direction**: From bottom
- **Slide Distance**: `3` units
- **Fade In Duration**: `1s`
- **Opacity**: `0 → 1`

#### Camera Zoom-out
- **Zoom Out Delay**: `0.5s` (after flip complete)
- **Zoom Out Duration**: `2s` (scrubbed)
- **Zoom Out Distance**: `3` units
- **FOV Start**: `50°`
- **FOV End**: `75°`
- **FOV Duration**: `2s` (scrubbed)

---

## 📷 Camera Settings

### Default Camera
- **Position**: `[0, 0, 5]`
- **FOV**: `75°`
- **Near Plane**: `0.1`
- **Far Plane**: `1000`
- **Aspect Ratio**: Auto (based on viewport)

### Scene-Specific Camera Positions

#### Scene 1
- **Position**: `[0, 0, 5]`
- **Look At**: `[0, 0, 0]`
- **FOV**: `75°`

#### Scene 2 (Start)
- **Position**: `[0, 0, 7]` (zoomed out)
- **Look At**: `[0, 1, 0]` (panned up)
- **FOV**: `75°`

#### Scene 2 (End - Wireframe)
- **Position**: `[0, 2, 8]` (tilted view)
- **Look At**: `[0, 0, 0]`
- **FOV**: `75°`

#### Scene 3 (Start)
- **Position**: `[0, 2, 8]` (from S2)
- **FOV**: `75°`

#### Scene 3 (End - Slot)
- **Position**: `[0, 0, 10]` (pulled back)
- **Look At**: `[0, 0, 0]`
- **FOV**: `75°`

#### Scene 4 (Start)
- **Position**: `[0, 0, 10]` (from S3)
- **FOV**: `75°`

#### Scene 4 (End - Interior)
- **Position**: `[0, 2, 3]` (inside cone)
- **Look At**: `[0, 0, 0]`
- **FOV**: `50°` (narrower)

#### Scene 5 (Pinned)
- **Position**: `[0, 2, 3]` (locked)
- **Look At**: `[0, 0, 0]`
- **FOV**: `50°`
- **Angle**: Top-down `5°`

#### Scene 6 (Start)
- **Position**: `[0, 2, 3]` (from S5)
- **FOV**: `50°`

#### Scene 6 (End)
- **Position**: `[0, 0, 8]` (wide shot)
- **Look At**: `[0, 0, 0]`
- **FOV**: `75°`

---

## 💡 Lighting Settings

### Ambient Light
- **Type**: `AmbientLight`
- **Color**: `#FFFFFF`
- **Intensity**: `0.5`
- **Used in**: All scenes

### Point Light
- **Type**: `PointLight`
- **Color**: `#FFFFFF`
- **Intensity**: `1.0`
- **Position**: `[10, 10, 10]`
- **Distance**: `100`
- **Decay**: `2`
- **Used in**: All scenes

### Directional Light (Optional)
- **Type**: `DirectionalLight`
- **Color**: `#FFFFFF`
- **Intensity**: `0.8`
- **Position**: `[5, 5, 5]`
- **Target**: `[0, 0, 0]`
- **Used in**: Scene 2 (Illumination Reveal)

### Spotlight (Scene 2 - Illumination)
- **Type**: `SpotLight`
- **Color**: `#FFFFFF`
- **Intensity**: `2.0`
- **Angle**: `Math.PI / 6` (30°)
- **Penumbra**: `0.5`
- **Decay**: `2`
- **Distance**: `50`

---

## 🎭 Material Settings

### Default Material (Solid)
- **Type**: `MeshStandardMaterial`
- **Color**: `#8B7355` (Brown - nón lá color)
- **Roughness**: `0.7`
- **Metalness**: `0.1`
- **Emissive**: `#000000`
- **EmissiveIntensity**: `0`

### Wireframe Material
- **Type**: `MeshBasicMaterial`
- **Color**: `#333333` (Dark Gray)
- **Wireframe**: `true`
- **WireframeLinewidth**: `1`
- **Opacity**: `1`
- **Transparent**: `false`

### Map Material (Scene 1)
- **Type**: `MeshStandardMaterial`
- **Color**: `#4A90E2` (Blue)
- **Roughness**: `0.5`
- **Metalness**: `0.2`
- **Emissive**: `#1A3A5C`
- **EmissiveIntensity**: `0.3`

### Ripple Material
- **Type**: `MeshBasicMaterial`
- **Color**: `#4A90E2`
- **Transparent**: `true`
- **Opacity**: `0.3`
- **Side**: `DoubleSide`

---

## 📏 Scene Dimensions

### Viewport
- **Width**: `100vw` (viewport width)
- **Height**: `100vh` (viewport height)
- **Aspect Ratio**: Auto

### Scene Heights (Virtual)
- **Scene 1**: `100vh`
- **Scene 2**: `100vh`
- **Scene 3**: `100vh`
- **Scene 4**: `100vh`
- **Scene 5**: `600vh` (pinned, virtual height)
- **Scene 6**: `100vh`

### 3D Space Units
- **World Scale**: `1 unit = 1 meter` (conceptual)
- **Model Scale**: Auto-fit to viewport
- **Default Model Size**: `2` units (diameter/height)

---

## ⚡ Performance Settings

### Rendering
- **Target FPS**: `60fps`
- **Pixel Ratio**: `Math.min(window.devicePixelRatio, 2)` (cap at 2x)
- **Antialiasing**: `true`
- **Shadow Map Size**: `2048` (if shadows enabled)

### LOD (Level of Detail)
- **High Detail Distance**: `10` units
- **Medium Detail Distance**: `20` units
- **Low Detail Distance**: `50` units
- **Currently**: Not implemented (all high detail)

### Asset Loading
- **Preload**: `true`
- **Loading Strategy**: Progressive (load Scene 1 first)
- **Texture Compression**: Auto (based on format)

### Scroll Performance
- **Scroll Sensitivity**: `1` (normal)
- **Smooth Scroll Duration**: `1.2s` (Lenis)
- **Scroll Easing**: Custom (Lenis default)
- **Scroll Multiplier**: `1`

---

## 🎯 ScrollTrigger Settings

### General
- **Scrub**: `true` (for all scroll-controlled scenes)
- **Scrub Smooth**: `0.1` (smooth factor)
- **Start**: `top top` (when element top hits viewport top)
- **End**: `bottom top` (when element bottom hits viewport top)

### Pin Settings (Scene 5)
- **Pin**: `true`
- **PinSpacing**: `false` (no extra spacing)
- **PinReparent**: `false`

### Markers (Development)
- **Markers**: `false` (set to `true` for debugging)

---

## 🔄 Lenis Smooth Scroll

### Configuration
- **Duration**: `1.2s`
- **Easing**: Custom (Lenis default easing function)
- **Orientation**: `vertical`
- **Gesture Orientation**: `vertical`
- **Smooth Wheel**: `true`
- **Wheel Multiplier**: `1`
- **Smooth Touch**: `false` (desktop only)
- **Touch Multiplier**: `2`
- **Infinite**: `false`

---

## 📦 Model Import Settings

### GLTF/GLB Loader
- **Format**: `.glb` (binary, preferred)
- **Draco Compression**: `false` (if available, enable for smaller files)
- **Animation**: `true` (if models have animations)
- **Scale**: Auto-fit to `2` units

### Model Paths (Placeholder)
- **Vietnam Map**: `/models/vietnam-map.glb`
- **Nón Lá (Full)**: `/models/non-la-full.glb`
- **Vành Nón**: `/models/vanh-non.glb`
- **Lá Nón**: `/models/la-non.glb`
- **Khung Nón**: `/models/khung-non.glb`
- **Sườn Nón**: `/models/suon-non.glb`
- **Quai Nón**: `/models/quai-non.glb`

---

## 🎨 Ripple Effect (Scene 1)

### Configuration
- **Ripple Count**: `3` (concentric circles)
- **Ripple Interval**: `2s`
- **Ripple Duration**: `2s`
- **Scale Start**: `1`
- **Scale End**: `3`
- **Opacity Start**: `0.6`
- **Opacity End**: `0`
- **Color**: `#4A90E2`
- **Line Width**: `2px`

---

## 📝 Text Placeholders

### Scene 3 Slot Text
- **Content**: `"Placeholder Text for Scene 3"`
- **Font Size**: `2rem` (32px)
- **Font Weight**: `600`
- **Color**: `#FFFFFF`
- **Position**: Center of slot
- **Animation**: Fade in/out

### Scene 2 Callout Labels
- **Vành nón**: `"Vành Nón"`
- **Lá nón**: `"Lá Nón"`
- **Khung nón**: `"Khung Nón"`
- **Sườn nón**: `"Sườn Nón"`
- **Quai nón**: `"Quai Nón"`
- **Font Size**: `1.125rem` (18px)
- **Font Weight**: `500`
- **Color**: `#000000` (on light background)

### Scene 5 Sector Content
- **Sector 1**: `"Sector 1 Placeholder"`
- **Sector 2**: `"Sector 2 Placeholder"`
- **Sector 3**: `"Sector 3 Placeholder"`
- **Sector 4**: `"Sector 4 Placeholder"`
- **Sector 5**: `"Sector 5 Placeholder"`
- **Sector 6**: `"Sector 6 Placeholder"`
- **Font Size**: `1.5rem` (24px)
- **Font Weight**: `600`
- **Color**: `#FFFFFF`

---

## 🖥️ Desktop-Specific Settings

### Viewport Breakpoints
- **Desktop**: `> 1024px`
- **Target Resolution**: `1920x1080` (Full HD)
- **Max Resolution**: `2560x1440` (2K)

### 3D Quality (Desktop)
- **Pixel Ratio**: `2` (retina/high DPI)
- **Shadow Quality**: High
- **Texture Quality**: High
- **Geometry Detail**: High
- **Post-processing**: Enabled (if needed)

### Performance Targets (Desktop)
- **FPS**: `60fps` (target)
- **Frame Budget**: `16.67ms` per frame
- **GPU Usage**: Optimized for desktop GPUs

---

## 🔧 Easing Functions (GSAP)

### Default Easings
- **Smooth Scroll**: `power2.inOut`
- **Camera Moves**: `power2.inOut`
- **Fade Transitions**: `power1.inOut`
- **Scale Animations**: `back.out(1.7)`
- **Rotation**: `power2.inOut`
- **Snap**: `power2.out`

### Custom Easings (if needed)
- **Bounce**: `bounce.out`
- **Elastic**: `elastic.out(1, 0.3)`
- **Expo**: `expo.inOut`

---

## 📊 Debug & Development

### Debug Mode
- **Enabled**: `false` (set to `true` for development)
- **Show Stats**: `false` (Three.js stats)
- **Show Axes**: `false` (Three.js axes helper)
- **Show Grid**: `false` (Three.js grid helper)
- **Show Markers**: `false` (GSAP ScrollTrigger markers)

### Console Logging
- **Scene Transitions**: `false`
- **Animation Progress**: `false`
- **Performance Metrics**: `false`

---

## 📌 Notes

- Tất cả thông số timing có thể điều chỉnh trong code
- ScrollTrigger scrub values có thể fine-tune để tăng độ mượt
- Camera positions có thể điều chỉnh để tối ưu góc nhìn
- Material colors sẽ được chỉnh sửa sau theo design
- Font có thể thay đổi nếu cần font khác hỗ trợ tiếng Việt tốt hơn

---

**Last Updated**: [Sẽ cập nhật sau khi implement]

