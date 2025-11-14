# Scene 1 Hyperparameters

> File này chứa tất cả các thông số có thể điều chỉnh cho Scene 1.  
> Bạn có thể thay đổi các giá trị này để fine-tune animation và timing.

---

## 🎯 Circle Animation Parameters

### Inner Circle
- **Draw Duration**: `300ms` - Thời gian vẽ mỗi bar
- **Stagger Delay**: `15ms` - Delay giữa mỗi bar
- **Number of Bars**: `60` - Số lượng bars trong vòng tròn trong
- **Total Draw Time**: `300ms + (15ms × 59) = ~1185ms` - Tổng thời gian vẽ inner circle
- **Rotation Speed**: `30000ms` (30 giây) - Thời gian quay 1 vòng đầy đủ
- **Rotation Direction**: Clockwise (theo chiều kim đồng hồ)
- **Inner Radius**: `100` (trong viewBox 400x400)

### Outer Circle
- **Draw Delay**: `200ms` - Delay sau khi inner circle hoàn thành
- **Dash Appear Duration**: `1500ms / 6 = ~250ms` - Thời gian vẽ mỗi dash (reduced from 416.67ms for faster completion)
- **Number of Dashes**: `6` - Số lượng dash strokes
- **Outer Start Delay**: `1185ms + 200ms = 1385ms` - Thời điểm bắt đầu vẽ outer circle
- **Total Draw Time**: `1385ms + (250ms × 6) = ~2885ms` - Tổng thời gian vẽ outer circle (reduced from 3885ms)
- **Rotation Speed**: `45000ms` (45 giây) - Thời gian quay 1 vòng đầy đủ (chậm hơn inner)
- **Rotation Direction**: Clockwise (theo chiều kim đồng hồ)
- **Outer Radius**: `150` (trong viewBox 400x400)

### SVG Container
- **ViewBox**: `"0 0 400 400"`
- **Wrapper Size**: `600px × 600px`
- **Center Point**: `(200, 200)` - Tâm của viewBox

---

## 🔵 Dots Stagger Parameters

### Grid Layout
- **Grid Size**: `13` - Kích thước grid (13×13 = 169 vị trí)
- **Dot Size**: `2px` - Kích thước mỗi dot (width × height) - reduced from 4px
- **Gap**: `25px` - Khoảng cách giữa các dots (reduced from 50px)
- **Max Distance**: `140px` - Khoảng cách tối đa từ center để dots nằm trong inner circle
- **Center Row**: `Math.floor(13 / 2) = 6`
- **Center Col**: `Math.floor(13 / 2) = 6`
- **Number of Dots**: Dynamic - Tất cả dots nằm trong inner circle (không giới hạn số lượng)

### Timing - Fade In
- **Inner Circle Complete Time**: `1100ms` - Thời điểm inner circle hoàn thành (để bắt đầu fade in)
- **Fade In Duration**: `500ms` - Thời gian fade in dots
- **Fade In Start**: `1100ms` - Bắt đầu fade in
- **Fade In Complete**: `1100ms + 500ms = 1600ms` - Hoàn thành fade in

### Timing - Animation 3 Giai Đoạn
- **Outer Circle Complete Time**: `2900ms` - Thời điểm outer circle hoàn thành (để bắt đầu animation) - reduced from 3900ms
- **Phase 1 Duration**: `400ms` - Co lại về tâm
- **Phase 2 Duration**: `300ms` - Giãn nở mạnh
- **Phase 3 Duration**: `500ms` - Trở về và fade out
- **Total Animation Duration**: `400ms + 300ms + 500ms = 1200ms`
- **Stagger Delay**: `50ms` - Delay giữa mỗi đơn vị Manhattan distance

### Animation Values
- **Pull Amount**: `distance × 0.3` (max 30px) - Khoảng cách co về tâm
- **Push Amount**: `distance × 0.5` (max 50px) - Khoảng cách bật ra ngoài
- **Scale Range**: 
  - Initial: `1`
  - Phase 1 End: `0.5`
  - Phase 2 End: `2.5`
  - Phase 3 End: `0`

### Opacity & Visibility Control
- **Initial Opacity**: `0` (invisible)
- **Initial Visibility**: `hidden` - Dots hoàn toàn ẩn cho đến khi fade in
- **Fade In**: 
  - Visibility set to `visible` trong `begin` callback của anime.js
  - Opacity animate từ `0 → 1` trong `500ms`
- **After Fade In**: `opacity: 1, visibility: visible` - Dots visible và giữ nguyên cho đến animation 3 giai đoạn
- **Phase 1 & 2**: `opacity: 1` (keep visible) - Dots vẫn visible trong 2 giai đoạn đầu
- **Phase 3**: `opacity: 1 → 0` (fade out) - Fade out trong giai đoạn cuối

---

## 🗺️ Map 3D Parameters

### Fade In Animation
- **Fade In Delay**: `1500ms` - Delay sau khi circles bắt đầu
- **Fade In Duration**: `1500ms` - Thời gian fade in
- **Scale Start**: `0.8`
- **Scale End**: `1`

### Position
- **Position**: `[0, 0, 0]` - Center
- **Camera Position**: `[0, 0, 5]`
- **Camera FOV**: `75°`

---

## 🌊 Ripple Effect Parameters

### Configuration
- **Ripple Count**: `3` - Số lượng vòng tròn đồng tâm
- **Ripple Interval**: `2000ms` (2 giây) - Khoảng thời gian giữa mỗi lần tạo ripple
- **Ripple Duration**: `2000ms` (2 giây) - Thời gian animation mỗi ripple
- **Stagger Between Rings**: `300ms` - Delay giữa các vòng tròn trong cùng một ripple

### Animation Values
- **Scale Start**: `1`
- **Scale End**: `3`
- **Opacity Start**: `0.6`
- **Opacity End**: `0`
- **Easing**: `power2.out` (GSAP)

---

## 📐 Visual Parameters

### Colors
- **Background**: `#000000` (Black)
- **Circle Stroke**: `#FFFFFF` (White)
- **Dot Color**: `#FFFFFF` (White)
- **Ripple Color**: `#4A90E2` (Blue)

### Z-Index Layering
- **Circle Animation**: `z-index: 1`
- **Dots Stagger**: `z-index: 2`
- **Map 3D**: `z-index: 3`

---

## ⏱️ Timeline Tổng Hợp

| Thời Điểm | Sự Kiện |
|-----------|---------|
| `0ms` | Inner circle bắt đầu vẽ |
| `~1185ms` | Inner circle hoàn thành |
| `1100ms` | Dots bắt đầu fade in (visibility: visible, opacity: 0 → 1) |
| `1385ms` | Outer circle bắt đầu vẽ |
| `1600ms` | Dots fade in hoàn thành (visible, opacity: 1) |
| `~2885ms` | Outer circle hoàn thành (reduced from 3885ms) |
| `2900ms` | Dots bắt đầu animation 3 giai đoạn (reduced from 3900ms) |
| `2900ms + stagger` | Mỗi dot bắt đầu animation theo khoảng cách từ center |
| `2900ms + stagger + 1200ms` | Animation 3 giai đoạn hoàn thành |

---

## 🔧 Cách Điều Chỉnh

### Để thay đổi timing:
1. Mở file `src/components/Scene1/DotsStagger.jsx`
2. Tìm các constant ở đầu `useEffect`:
   - `innerCircleCompleteTime`
   - `outerCircleCompleteTime`
   - `fadeInDuration`
   - `phase1Duration`, `phase2Duration`, `phase3Duration`
   - `staggerDelay`

### Để thay đổi kích thước grid:
1. Mở file `src/components/Scene1/DotsStagger.jsx`
2. Tìm các constant:
   - `gridSize` (hiện tại: 13)
   - `dotSize` (hiện tại: 2px)
   - `gap` (hiện tại: 25px)
   - `maxDistance` (hiện tại: 140px)

### Để thay đổi animation values:
1. Tìm trong `dotData.forEach`:
   - `pullAmount` calculation
   - `pushAmount` calculation
   - Scale values trong keyframes

### Để thay đổi Circle Animation:
1. Mở file `src/components/Scene1/CircleAnimation.jsx`
2. Tìm các constant:
   - `innerDuration`, `innerStaggerDelay`
   - `dashAppearDuration`, `outerStartDelay`
   - `innerRotationDuration`, `outerRotationDuration`

---

## 📝 Notes

- Tất cả timing được tính bằng milliseconds (ms)
- Các giá trị có thể được điều chỉnh để tạo hiệu ứng khác nhau
- Nên test sau mỗi lần thay đổi để đảm bảo animation mượt mà
- Timing giữa các components cần được đồng bộ để tạo hiệu ứng liền mạch

---

**Last Updated**: 2024 - Đã cập nhật với các giá trị thực tế từ implementation

