# Checklist Chuẩn Bị Implementation

## ✅ Đã có trong kịch bản

- [x] Mô tả chi tiết 6 scene
- [x] Flow animation rõ ràng cho từng scene
- [x] Xác định thư viện sử dụng (GSAP, Anime.js, Three.js)
- [x] Scroll direction: Vertical (từ mô tả)
- [x] Scene height: Full viewport (100vh)
- [x] Background colors: Đen (#000) và nền sáng (wireframe mode)

---

## ❓ Cần làm rõ trước khi implement

### 1. Assets 3D Models

#### Scene 1:
- [ ] **File `.glb` bản đồ Việt Nam**
  - Kích thước file: ? MB
  - Độ phân giải: ?
  - Có sẵn file chưa? Nếu chưa, cần tạo hoặc tìm nguồn

#### Scene 2-6:
- [ ] **Mô hình 3D Nón lá**
  - **Option A**: 1 file `.glb` chứa toàn bộ nón (sẽ tách thành 5 parts trong code)
  - **Option B**: 5 files riêng biệt (Vành, Lá, Khung, Sườn, Quai)
  - **Option C**: 1 file với các parts đã được group/named sẵn
  - Kích thước file: ? MB
  - Có sẵn file chưa? Nếu chưa, cần tạo hoặc tìm nguồn

**Câu hỏi:**
- Bạn đã có các file 3D này chưa?
- Nếu chưa, bạn muốn tôi tìm nguồn free/paid hay bạn sẽ cung cấp sau?

---

### 2. Nội dung Text

#### Scene 3:
- [ ] **Text trong "slot"**
  - Nội dung text: ?
  - Font size: ?
  - Font family: ?
  - Màu sắc: ?

#### Scene 2:
- [ ] **Text labels cho callout lines**
  - Label cho "Vành nón": ?
  - Label cho "Lá nón": ?
  - Label cho "Khung nón": ?
  - Label cho "Sườn nón": ?
  - Label cho "Quai nón": ?
  - Font size: ?
  - Font family: ?
  - Màu sắc: ?

#### Scene 5:
- [ ] **Nội dung cho 6 sectors**
  - Sector 1: ? (hiện tại là placeholder)
  - Sector 2: ? (hiện tại là placeholder)
  - Sector 3: ? (hiện tại là placeholder)
  - Sector 4: ? (hiện tại là placeholder)
  - Sector 5: ? (hiện tại là placeholder)
  - Sector 6: ? (hiện tại là placeholder)
  - Format: Text only / Text + Image / Text + 3D object / HTML content?

---

### 3. Typography & Styling

- [ ] **Font chữ chính:**
  - Font family: ? (ví dụ: Inter, Poppins, Roboto, hoặc custom font)
  - Font weights cần: ? (Regular, Medium, Bold?)
  - Có cần import từ Google Fonts không?

- [ ] **Màu sắc chi tiết:**
  - Background đen: `#000000` (đã có)
  - Background sáng (wireframe): `#FFFFFF` hay `#F5F5F5`?
  - Text color: `#FFFFFF` (trắng)?
  - Accent color (nếu có): ?
  - Callout lines color: ?

---

### 4. Animation Timing & Performance

- [ ] **Scene 1 (Auto-play):**
  - Duration vòng tròn trong: ? giây
  - Duration vòng tròn ngoài: ? giây
  - Delay giữa các bước: ? giây
  - Ripple effect: Interval? (mỗi ? giây)

- [ ] **Scene 5 (Pinned section):**
  - Chiều cao ảo (virtual height): ? vh (ví dụ: 600vh)
  - Số lượng scroll "steps" cho mỗi sector: ?
  - Snapping sensitivity: ? (có cần smooth snap hay instant?)

- [ ] **Performance:**
  - Target FPS: 60fps?
  - Có cần LOD (Level of Detail) cho 3D models không?
  - Có cần preload assets không?

---

### 5. Navigation & UX

- [ ] **Navigation menu:**
  - Có cần menu để jump giữa các scene không?
  - Nếu có, style: Fixed top / Sidebar / Dots indicator?
  - Có cần progress bar không?

- [ ] **Scroll behavior:**
  - Scroll speed: Normal / Fast / Custom?
  - Có cần scroll indicator (arrow, "scroll down" text) không?

---

### 6. Responsive Design

- [ ] **Mobile (< 768px):**
  - Có cần simplify animations không?
  - 3D models có cần scale down không?
  - Scene 5 carousel: Có cần thay đổi cách hiển thị không?

- [ ] **Tablet (768px - 1024px):**
  - Có cần điều chỉnh gì không?

- [ ] **Desktop (> 1024px):**
  - Có cần tăng độ chi tiết 3D không?

---

### 7. Technical Details

- [ ] **Camera settings:**
  - FOV (Field of View) mặc định: ? (ví dụ: 75)
  - FOV khi vào interior (Scene 4): ? (ví dụ: 50)
  - Near plane: ? (ví dụ: 0.1)
  - Far plane: ? (ví dụ: 1000)

- [ ] **Lighting:**
  - Ambient light intensity: ?
  - Point light position & intensity: ?
  - Có cần directional light không?

- [ ] **Materials:**
  - Material type cho nón lá: Standard / Physical / Custom?
  - Wireframe stroke width: ? px
  - Wireframe color: ?

---

## 📋 Priority Checklist

### Phase 1: Setup & Assets (Ưu tiên cao)
1. [ ] Xác nhận có/không có 3D models
2. [ ] Quyết định nguồn 3D models (tạo mới / tìm nguồn / bạn cung cấp)
3. [ ] Setup folder structure cho assets
4. [ ] Import và test load 3D models

### Phase 2: Core Structure (Ưu tiên cao)
1. [ ] Tạo component structure cho 6 scenes
2. [ ] Setup GSAP ScrollTrigger timeline
3. [ ] Setup Three.js canvas và camera
4. [ ] Setup Lenis smooth scroll

### Phase 3: Scene Implementation (Ưu tiên trung bình)
1. [ ] Scene 1: Circles + Map + Ripple
2. [ ] Scene 2: Deconstruct + Wireframe
3. [ ] Scene 3: Reformation + Slot
4. [ ] Scene 4: Interior reveal
5. [ ] Scene 5: Carousel (pinned)
6. [ ] Scene 6: Exit sequence

### Phase 4: Polish & Optimization (Ưu tiên thấp)
1. [ ] Add text content
2. [ ] Fine-tune animations
3. [ ] Performance optimization
4. [ ] Responsive adjustments
5. [ ] Navigation menu (nếu cần)

---

## 🎯 Câu hỏi cần trả lời NGAY

1. **Bạn đã có file 3D models chưa?** (Bản đồ Việt Nam + Nón lá)
   - Nếu có: Vui lòng cung cấp hoặc cho biết đường dẫn
   - Nếu chưa: Bạn muốn tôi tìm nguồn hay bạn sẽ cung cấp sau?

2. **Nội dung text cho Scene 3 và Scene 5:**
   - Bạn có nội dung cụ thể chưa, hay để placeholder tạm thời?

3. **Typography:**
   - Bạn có font yêu thích không, hay để tôi chọn font phù hợp?

4. **Timeline:**
   - Bạn muốn implement từng scene một hay tất cả cùng lúc?
   - Có deadline cụ thể không?

---

## 💡 Gợi ý

Nếu bạn chưa có 3D models, tôi có thể:
- Tìm nguồn free models từ Sketchfab, Poly Haven
- Tạo placeholder đơn giản để test flow trước
- Hướng dẫn bạn cách tạo/export models

Bạn muốn bắt đầu từ đâu?

