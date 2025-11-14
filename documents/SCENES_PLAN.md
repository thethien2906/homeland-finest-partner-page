# Kịch bản 6 Scene - React Animation Project

## Tổng quan
- **Số lượng scene**: 6
- **Layout**: Scroll-based (vertical hoặc horizontal)
- **Smooth scrolling**: Sử dụng Lenis
- **Animation libraries**: GSAP, Anime.js, Three.js

---


## Danh sách 6 Scene

---

### Scene 1: intro reveal

**Mục đích/Ý tưởng:**
* Thiết lập bối cảnh cho toàn bộ trang web.
* Tạo một màn "reveal" (tiết lộ) ấn tượng, chuẩn bị cho sự xuất hiện của các scene sau.

**Nội dung hiển thị:**
* Một vòng tròn bên trong (tạo bởi các nét đứt/dash strokes mảnh, dựng đứng).
* Một vòng tròn bên ngoài (tạo bởi 5 nét đứt dài, đường cung).
* Các dấu chấm (dots) ở tâm (cho hiệu ứng staggering).
* File 3D `.glb` hình bản đồ Việt Nam (hiển thị ở trung tâm).
* Hiệu ứng sóng (ripple) liên tục trên bản đồ.

**Animation/Effects:**
* **Loại animation (flow):**
    1.  Vòng tròn trong tự vẽ + quay theo chiều kim đồng hồ (tốc độ vừa phải).
    2.  Vòng tròn ngoài tự vẽ (sau 1 nhịp) + quay (chậm hơn/lệch pha).
    3.  Hiệu ứng "dots-staggering" lan toả từ tâm (Scale tăng $\rightarrow$ Opacity giảm $\rightarrow$ Biến mất).
    4.  Bản đồ 3D (Việt Nam) hiện ra ở tâm (bên trong vòng tròn).
    5.  Hiệu ứng ripple liên tục phát ra từ tâm bản đồ (đây là trạng thái nghỉ của scene 1).
* **Thư viện sử dụng:**
    * **Anime.js**: Cho 2 vòng tròn (dash strokes) và hiệu ứng dots-staggering.
    * **Three.js**: Để load/hiển thị file `.glb` (bản đồ) và tạo hiệu ứng ripple 3D.
* **Trigger:** **Auto-play** (tự động chạy) ngay khi tải trang.

**Layout & Styling:**
* **Full screen** (chiếm 100% viewport height).
* **Background:** Màu đen (`#000`).
* **Nội dung:** Toàn bộ animation và vật thể 3D được căn giữa (center) màn hình.

**Tương tác:**
* Không yêu cầu tương tác (click/hover). Người dùng chỉ xem animation.
* Tương tác duy nhất là **scroll** để chuyển sang scene tiếp theo.

**Kết nối với scene trước/sau:**
* **Từ trước:** (Không có, đây là scene đầu tiên).
* **Sang sau:** Người dùng **scroll** xuống để kích hoạt chuyển tiếp sang Scene 2.

- 

---


### Scene 2: Phân rã Cấu trúc Nón lá (Deconstructing the Nón Lá)

**Mục đích/Ý tưởng:**
* Tạo sự bất ngờ khi tiết lộ Scene 1 thực chất là bên trong của một chiếc Nón lá.
* "Phân rã" (deconstruct) Nón lá thành 5 thành phần cấu tạo cốt lõi.
* Chuyển đổi bối cảnh từ "huyền ảo/năng lượng" (Scene 1) sang "kỹ thuật/phân tích" (technical blueprint) thông qua hiệu ứng wireframe và callout lines.

**Nội dung hiển thị:**
* Một mô hình **Nón lá 3D** (ban đầu là vật liệu thật, sau chuyển sang wireframe).
* 5 bộ phận được tách lớp: Vành nón, Lá nón, Khung nón, Sườn nón, Quai nón.
* Hiệu ứng ánh sáng "Illumination Reveal" quét qua cấu trúc.
* Các đường "Callout lines" (leader lines) chỉ vào các bộ phận.
* Các **Text labels** (chữ) đi kèm callout lines (ở 2 góc).

**Animation/Effects:**
* **Loại animation (flow, điều khiển 100% bằng scroll):**
    1.  **Transition (từ S1):** Camera **Zoom out** nhẹ. Vòng tròn Scene 1 lộ ra là Vành Nón lá.
    2.  **Tilt & Reveal:** Nón lá **nghiêng lên** (xoay trục X) và camera **pan lên**, để lộ 5 lớp cấu tạo.
    3.  **Deconstruct:** Khi scroll, 5 lớp tách ra dọc theo trục của nón theo thứ tự vành nón -> lá nón -> khung nón -> sườn nón -> quai nón
    4.  **Stabilize & Rotate:** Các lớp ổn định ở góc nghiêng 45° so với camera (chóp nón hướng lên-trái, vành nón hướng xuống-phải). **Từng lớp bắt đầu tự xoay** (Vành xoay đều, Lá xoay kiểu gió, Khung/Sườn xoay ngược chiều, Quai cũng xoay).
    5.  **Illumination Reveal:** *Sau khi* các lớp ổn định, một luồng **ánh sáng quét** dọc theo nan và vành nón.
    6.  **Technical Switch:** *Ngay sau đó*, vật liệu 3D chuyển sang **"wireframe mode"**. Shading và màu sắc biến mất.
    7.  **Callouts:** Các đường **callout lines** (leader lines) xuất hiện, nối từ 2 góc màn hình vào các bộ phận.
* **Thư viện sử dụng:**
    * **Three.js**: Bắt buộc. Dùng để render mô hình 3D, điều khiển camera, vật liệu (materials), ánh sáng, và chế độ wireframe.
    * **GSAP (với ScrollTrigger):** Rất khuyến khích. Dùng để "scrub" (điều khiển) toàn bộ chuỗi animation 3D (camera zoom/pan, xoay, tách lớp) dựa trên vị trí thanh cuộn (scroll position).
* **Trigger:** **Scroll position** (toàn bộ scene là một timeline được điều khiển bằng scroll).

**Layout & Styling:**
* **Full screen** (chiếm 100% viewport height).
* **Background:** Bắt đầu bằng màu đen (`#000`), sau đó **chuyển sang nền sáng** (trắng hoặc xám nhạt) khi hiệu ứng "wireframe mode" được kích hoạt (để tạo cảm giác "bản vẽ kỹ thuật").
* **Text position:** Các callout lines và text labels sẽ xuất hiện ở góc **trên-phải** và góc **dưới-trái**.

**Tương tác:**
* Tương tác chính là **scroll** để "tua" (scrub) qua các giai đoạn của animation.

**Kết nối với scene trước/sau:**
* **Từ trước:** Chuyển tiếp mượt mà. Vòng tròn của Scene 1 được "tái định nghĩa" thành Vành Nón Lá.
* **Sang sau:** (Cần xác định) Scene kết thúc ở trạng thái "bản vẽ kỹ thuật" (wireframe) với các callout lines đã hiển thị.

---


### Scene 3: Reformation & Text Reveal Slot (Tái định hình & Tạo khe chứa Text)

**Mục đích/Ý tưởng:**
* Là một scene "chuyển tiếp" (bridge scene) để thoát khỏi trạng thái "phân tích" (blueprint) của Scene 2.
* "Đóng" (reconstruct) các lớp nón lá lại một cách nghệ thuật, thu hồi các chi tiết kỹ thuật (callout lines).
* Chuyển đổi bối cảnh từ "kỹ thuật" (nền sáng, wireframe) trở về "huyền ảo/nghệ thuật" (nền đen, solid).
* Tái cấu trúc layout 3D, tạo ra một "khoảng trống" (slot) lớn ở trung tâm để chuẩn bị hiển thị nội dung mới.

**Nội dung hiển thị:**
* Mô hình 3D của 5 bộ phận Nón lá (kế thừa từ Scene 2).
* Các đường Callout lines và Text labels (chỉ xuất hiện ở đầu scene rồi biến mất).

**Animation/Effects:**
* **Loại animation (flow, điều khiển 100% bằng scroll):**
    1.  **Thu hồi Callouts:** Khi bắt đầu scroll, các callout lines (trên rồi dưới) rút lại và fade out.
    2.  **Đóng lớp (Layer Collapse):** Đồng thời, 5 tầng 3D thu hẹp khoảng cách theo trục Z và di chuyển về tâm chung (nhưng không hợp nhất hoàn toàn).
    3.  **Nghiêng 90°:** Trong khi "collapse", toàn bộ cụm nón lá nghiêng dần sang phải, cho đến khi người xem nhìn vuông góc 90° từ bên trái sang.
    4.  **Thoát Wireframe:** Ngay khi đạt 90° và các lớp đã đóng xong, chế độ wireframe fade-out (stroke mỏng dần, opacity về 0), vật liệu 3D trở về dạng "solid".
    5.  **Chuyển nền:** Đồng thời với việc thoát wireframe, background **crossfade** mượt từ nền sáng (của S2) sang **nền đen (`#000`)**.
    6.  **Tạo "Slot":** Camera "pull back" (zoom out nhẹ). Khối 3D ổn định ở vị trí mới: 4 tầng trên ở phía trên, Quai nón ở phía dưới, tạo ra một khoảng trống (slot) lớn ở giữa.
* **Thư viện sử dụng:**
    * **Three.js**: Bắt buộc. Để điều khiển vật thể 3D, camera, vật liệu (wireframe -> solid).
    * **GSAP (với ScrollTrigger):** Rất khuyến khích. Dùng để "scrub" (điều khiển) toàn bộ chuỗi animation phức tạp này (callout, collapse, xoay, zoom) và cả hiệu ứng crossfade nền dựa trên vị trí scroll.
* **Trigger:** **Scroll position** (toàn bộ scene là một timeline được điều khiển bằng scroll).

**Layout & Styling:**
* **Full screen** (chiếm 100% viewport height, tiếp nối S2).
* **Background:** Bắt đầu bằng nền sáng, sau đó **crossfade mượt sang nền đen (`#000`)**.
* **Layout cuối:** Khối 3D (dạng solid) được chia làm 2 phần (trên và dưới), với một "slot" trống rõ rệt ở trung tâm màn hình.

**Tương tác:**
* Tương tác chính là **scroll** để "tua" (scrub) qua các giai đoạn của animation.

**Kết nối với scene trước/sau:**
* **Từ trước:** Nối tiếp mượt mà 100% từ trạng thái cuối cùng của Scene 2 (wireframe, 45°, callouts active).
* **Sang sau:** Scene kết thúc ở trạng thái "nghỉ": nền đen, mô hình 3D solid nghiêng 90°, và một "slot" trống ở giữa, sẵn sàng cho Scene 4.

---


### Scene 4: Return to Origin & Interior World Reveal (Tái định vị & Tiết lộ Thế giới Nội tâm)

**Mục đích/Ý tưởng:**
* Giải quyết nội dung text "slot" từ Scene 3.
* Thực hiện một cú chuyển tiếp điện ảnh (cinematic transition) từ góc nhìn bên ngoài (exterior) sang góc nhìn bên trong (interior) của Nón lá.
* "Tái định vị" (ret-con) lòng nón: biến nó từ một bối cảnh (như S1) thành một "Sân khấu" hay Giao diện người dùng (UI) mới.
* Thiết lập một "hub" điều hướng (navigation hub) cho 6 scene nội dung tiếp theo, sử dụng 6 thanh sườn nón làm vách ngăn.

**Nội dung hiển thị:**
* Mô hình 3D Nón lá (các bộ phận từ S3: Vành, Lá, Khung, Sườn, Quai).
* Text placeholder (kế thừa từ S3, chỉ xuất hiện ở đầu scene).
* *Cuối scene:* Chỉ còn lại `Lá nón` và 6 thanh `Sườn nón`.

**Animation/Effects:**
* **Loại animation (flow, điều khiển 100% bằng scroll):**
    1.  **Text Fade-out:** Khi bắt đầu scroll, text ở "slot" (từ S3) `fade-out`.
    2.  **Tilt & Hide:** Đồng thời, Nón lá bắt đầu **xoay quanh trục X** (nghiêng về phía người xem, để lộ đỉnh nón). Khi `Quai nón` bị thân nón che khuất, nó sẽ `fade-out` và dịch chuyển vào trong để biến mất.
    3.  **Full Flip (180°):** Nón tiếp tục xoay 180° cho đến khi lật úp hoàn toàn (mặt trong hướng thẳng lên).
    4.  **Camera Enter:** Camera di chuyển *lên trên* và *tiến vào* bên trong lòng nón (như "chui vào" nón).
    5.  **FOV Change:** `Field of View` (FOV) của camera thu hẹp lại một chút, tạo cảm giác "bước vào" một không gian mới, tập trung hơn.
    6.  **Model Simplify:** Trong quá trình camera di chuyển vào, `Vành nón` và `Khung nón` `fade-out`. Chỉ giữ lại `Lá nón` (làm nền) và 6 thanh `Sườn nón` (làm vách ngăn).
* **Thư viện sử dụng:**
    * **Three.js**: Bắt buộc. Để điều khiển vật thể 3D, camera (pan, zoom, FOV), và ẩn/hiện vật liệu (materials).
    * **GSAP (với ScrollTrigger):** Rất khuyến khích. Dùng để "scrub" (điều khiển) toàn bộ chuỗi animation phức tạp này (xoay, fade text, camera move) dựa trên vị trí scroll.
* **Trigger:** **Scroll position** (toàn bộ scene là một timeline được điều khiển bằng scroll).

**Layout & Styling:**
* **Full screen** (tiếp nối 100% viewport của S3).
* **Background:** Nền đen (`#000`) được duy trì xuyên suốt.
* **Layout cuối (Interior Stage):** Camera dừng lại ở vị trí bên trong lòng nón. 6 thanh `Sườn nón` chia màn hình thành 6 "phân đoạn" (sectors) rõ rệt, tạo thành một "bánh xe" (wheel) UI.

**Tương tác:**
* Tương tác chính là **scroll** để "tua" (scrub) qua các giai đoạn của animation.
* Trạng thái cuối của Scene 4 ngụ ý một tương tác mới: scroll để di chuyển giữa 6 phân đoạn.

**Kết nối với scene trước/sau:**
* **Từ trước:** Nối tiếp mượt mà 100% từ trạng thái cuối cùng của Scene 3 (nón thẳng đứng, nền đen, text ở "slot").
* **Sang sau:** Scene kết thúc ở trạng thái "hub". Lần scroll tiếp theo sẽ kích hoạt **Scene 5**, vốn là hành động **zoom/pan** vào **phân đoạn (sector) đầu tiên** trong 6 phân đoạn đó.


---


### Scene 5: The Interior Carousel (Băng chuyền Nội tâm)

**Mục đích/Ý tưởng:**
* Biến không gian bên trong Nón lá (từ S4) thành một "carousel 3D" hay "bánh xe nội dung" (content wheel).
* Sử dụng cơ chế "Pinned Scene": Ghim camera cố định và dùng hành động **scroll** của người dùng để **xoay** vật thể Nón lá, qua đó lần lượt tiết lộ 6 "sector" (phân đoạn) nội dung.
* Tập trung vào một sector tại một thời điểm, tạo cảm giác như "6 cửa" lần lượt mở ra.

**Nội dung hiển thị:**
* Mô hình 3D `Lá nón` (làm nền) và 6 thanh `Sườn nón` (làm vách ngăn).
* **Nội dung cho 6 sector (Temporary):**
    * Sector 1: Text Placeholder
    * Sector 2: Text Placeholder
    * Sector 3: Text Placeholder
    * Sector 4: Text Placeholder
    * Sector 5: Text Placeholder
    * Sector 6: Text Placeholder

**Animation/Effects:**
* **Loại animation (flow):**
    1.  **Pin Scene:** Khi scroll vào Scene 5, toàn bộ canvas 3D được `pin` (ghim) lại (chiếm 100vh). Scene này sẽ có chiều cao ảo (ví dụ: 600vh) để điều khiển animation.
    2.  **Lock Camera:** Camera được `lock` (khóa) ở một góc nhìn cố định (ví dụ: `top-down 5°`) và zoom cận cảnh vào khu vực trung tâm (nơi các sector sẽ xoay tới).
    3.  **Initial Rotate:** Nón lá tự động xoay nhẹ để đưa `Sector 1` vào đúng vị trí trung tâm của camera.
    4.  **Scrubbed Rotation (Core Loop):** Khi người dùng **scroll**, thanh cuộn sẽ được "scrub" (gắn) trực tiếp vào `rotation` (trục Y hoặc Z) của Nón lá.
    5.  **Sector Snapping:** Mỗi khi scroll một khoảng, nón sẽ xoay một góc (khoảng 60°) để "snap" (khớp) sector tiếp theo vào vị trí trung tâm.
    6.  **Sector Transitions:** Khi chuyển từ sector A sang B, nội dung A `fade-out` (hoặc mờ đi), và nội dung B `fade-in` (có thể kèm hiệu ứng `scale` nhẹ từ 1.03 -> 1.00 để tạo điểm nhấn).
* **Thư viện sử dụng:**
    * **Three.js**: Bắt buộc. Render mô hình nón, 6 sườn, và bất kỳ nội dung 3D nào bên trong các sector.
    * **GSAP (với ScrollTrigger):** *Cực kỳ quan trọng*. Dùng `pin: true` để ghim scene và `scrub` để kết nối thanh cuộn với `rotation` của vật thể 3D.
* **Trigger:** **Scroll position**. Toàn bộ scene là một `pinned section` dài, được điều khiển 100% bằng scroll.

**Layout & Styling:**
* **Full screen** (Canvas 3D được ghim 100% viewport).
* **Background:** Nền đen (`#000`).
* **Layout:** Camera cố định, vật thể 3D (nón lá) xoay ở trung tâm. Nội dung (HTML hoặc 3D) sẽ xuất hiện tuần tự bên trong các sector khi chúng xoay đến.

**Tương tác:**
* Tương tác chính là **scroll** để "xoay" qua 6 sector.

**Kết nối với scene trước/sau:**
* **Từ trước:** Nối tiếp mượt mà 100% từ trạng thái cuối của Scene 4 (camera đã ở trong lòng nón, sẵn sàng cho việc "pin").
* **Sang sau:** Scene kết thúc khi người dùng đã scroll đến sector cuối cùng (Sector 6). Khi `unpin`, camera và nón lá sẽ sẵn sàng cho transition của Scene 6.


---

Kế hoạch này rất "điện ảnh" và hợp lý!

Việc bạn tách biệt rõ ràng giữa **chuyển động của vật thể** (Nón lá rút lui và lật) với **chuyển động của camera** (chỉ zoom-out ở cuối) là một kỹ thuật dàn dựng (directing) rất chuyên nghiệp. Nó tạo ra một flow rất mượt mà để thoát khỏi Scene 5.

Hiệu ứng "Quai nón" slide-in từ off-screen cũng là một chi tiết đắt giá, tạo cảm giác "lắp ráp" trở lại một cách tự nhiên.

Tôi xin tổng hợp lại kịch bản Scene 6 của bạn vào template:

---

### Scene 6: Exit the Interior • Return to Outer Form (Thoát Nội tâm & Trở lại Hình dạng Ngoài)

**Mục đích/Ý tưởng:**
* Tạo một lối thoát (exit sequence) mượt mà khỏi "carousel nội tâm" của Scene 5.
* Đảo ngược (mirror) lại animation của Scene 4, "lật" Nón lá từ trạng thái úp (interior) trở về trạng thái thẳng đứng (exterior).
* Tái giới thiệu `Quai nón` một cách điện ảnh (slide-in) thay vì chỉ `fade-in`.
* Đưa camera trở về góc "đại cảnh" (wide shot), khép lại vòng lặp (narrative loop) và chuẩn bị cho bối cảnh của Scene 7.

**Nội dung hiển thị:**
* Mô hình 3D `Lá nón` và `Sườn nón` (từ S5).
* Mô hình 3D `Quai nón` (xuất hiện ở giữa scene).

**Animation/Effects:**
* **Loại animation (flow, điều khiển 100% bằng scroll):**
    1.  **Unpin & Retreat:** Khi scroll (thoát S5), canvas được `unpin`. **Camera đứng yên**. Nón lá bắt đầu **di chuyển lùi xa** (Position Z) khỏi camera, nhỏ dần.
    2.  **Flip (Mirror X-Rotation):** Nón lá tiếp tục **xoay ngược lại quanh trục X** (từ 180° -> 0°), lật từ trạng thái úp trở về thẳng đứng.
    3.  **Strap Reveal:** Khi nón xoay gần về vị trí thẳng đứng (khoảng 70-80%), `Quai nón` **slide-in từ cạnh dưới** màn hình và `fade-in` (opacity 0 -> 1) để "gắn" vào vị trí.
    4.  **Camera Zoom-out (Wide Shot):** *Sau khi* nón đã thẳng và quai đã xuất hiện, **camera** mới bắt đầu **zoom-out** (lùi lại). `Field of View` (FOV) có thể mở rộng ra, đưa Nón lá (đã hoàn chỉnh) về vị trí trung tâm, giống như trạng thái cuối Scene 3.
* **Thư viện sử dụng:**
    * **Three.js**: Bắt buộc. Để điều khiển vị trí, góc xoay của vật thể 3D, và camera (zoom, FOV).
    * **GSAP (với ScrollTrigger):** Rất khuyến khích. Dùng để `scrub` (điều khiển) toàn bộ chuỗi animation phức tạp này (object move -> object rotate -> strap slide -> camera zoom) dựa trên vị trí scroll.
* **Trigger:** **Scroll position** (toàn bộ scene là một timeline được điều khiển bằng scroll).

**Layout & Styling:**
* **Full screen** (tiếp nối 100vh từ S5).
* **Background:** Nền đen (`#000`) được duy trì xuyên suốt.
* **Layout cuối:** Nón lá (hoàn chỉnh với quai) đứng thẳng, ở trung tâm màn hình, tại một góc "đại cảnh" (wide shot).

**Tương tác:**
* Tương tác chính là **scroll** để "tua" (scrub) qua các giai đoạn của animation.

**Kết nối với scene trước/sau:**
* **Từ trước:** Nối tiếp mượt mà 100% từ trạng thái cuối của Scene 5 (đã xem xong sector 6).
* **Sang sau:** Scene kết thúc ở trạng thái "nghỉ": nón lá hoàn chỉnh ở đại cảnh, nền đen. Kết thúc


---


## Ghi chú bổ sung

### Các câu hỏi cần trả lời:
1. **Scroll direction**: Vertical (cuộn dọc) hay Horizontal (cuộn ngang)?
2. **Scene height**: Mỗi scene chiếm full viewport hay có thể scroll trong scene?
3. **Navigation**: Có cần navigation menu/jump to scene không?
4. **Theme/Color scheme**: Màu sắc chủ đạo?
5. **Typography**: Font chữ muốn sử dụng?
6. **Assets**: Có images, videos, 3D models cần import không?

### Tham khảo các loại animation phổ biến:
- **Scroll-triggered**: Animation khi scroll đến vị trí
- **Parallax**: Các layer di chuyển với tốc độ khác nhau
- **3D transforms**: Xoay, scale, translate trong không gian 3D
- **Text animations**: Reveal, typewriter, split text
- **Particle effects**: Background particles, confetti
- **Morphing**: Shape morphing, liquid effects
- **Sticky elements**: Elements dính khi scroll
- **Progress indicators**: Thanh tiến trình scroll

---

## Checklist trước khi implement

- [ ] Đã mô tả đầy đủ 10 scene
- [ ] Đã xác định thứ tự và flow giữa các scene
- [ ] Đã chọn animation library cho từng scene
- [ ] Đã xác định color scheme và typography
- [ ] Đã liệt kê assets cần thiết
- [ ] Đã xác định responsive behavior

