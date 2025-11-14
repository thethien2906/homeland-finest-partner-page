# Testing Folder

Đây là nơi để test các hiệu ứng trước khi implement vào scene.

## Quy Trình Test

### Bước 1: Tạo Component Test
1. Tạo file component test trong folder `testing/` (ví dụ: `YourEffectTest.jsx`)
2. Tạo file CSS nếu cần (ví dụ: `YourEffectTest.css`)
3. Import component vào `test-main.jsx`:
   ```jsx
   import YourEffectTest from './YourEffectTest.jsx'
   ```
4. Sử dụng component trong `test-main.jsx`:
   ```jsx
   <YourEffectTest />
   ```

### Bước 2: Test Component
1. Đảm bảo dev server đang chạy:
   ```bash
   npm run dev
   ```
2. Mở trình duyệt và truy cập:
   ```
   http://localhost:5173/testing/test.html
   ```
3. Test và điều chỉnh component cho đến khi hài lòng

### Bước 3: Implement Vào Scene
Sau khi test xong và hài lòng, implement component vào scene tương ứng:
- Copy logic từ component test vào component chính trong `src/components/`
- Điều chỉnh timing và integration với các component khác
- Xóa file test nếu không cần thiết nữa

## Files Trong Folder

- `test.html` - File HTML để test (không cần sửa)
- `test-main.jsx` - Entry point, import component test vào đây
- `README.md` - File này

## Lưu ý

- Các file trong folder này chỉ dùng để test, không ảnh hưởng đến code chính
- Sau khi test xong, có thể xóa file test hoặc giữ lại để tham khảo
- Luôn test trước khi implement vào scene để tránh phải sửa lại nhiều lần
