# Phần Mềm Theo Dõi Điện Thoại Từ Xa

Dự án web đơn giản được xây dựng bằng HTML, CSS, JavaScript thuần và TailwindCSS CDN.

## Tính năng

### 1. Màn hình chọn icon ban đầu
- Hiển thị lưới các icon ứng dụng
- Chuyển sang màn hình đăng nhập khi click vào bất kỳ icon nào

### 2. Màn hình đăng nhập
- Chọn mã quốc gia từ danh sách dropdown
- Nhập và validate số điện thoại (9-11 chữ số)
- Nhập mã phần mềm
- Hiển thị thông báo kích hoạt tài khoản chạy từ dưới lên
- Gọi API để xác thực mã phần mềm

### 3. Màn hình loading
- Hiển thị progress bar với animation
- Grid các icon ứng dụng
- Thông báo "Hệ thống đang xử lý, vui lòng chờ trong ít phút"

### 4. Màn hình đăng ký gói VIP
- 4 gói thuê bao: 1 năm, 2 năm, 5 năm, vĩnh viễn
- Khi click vào gói sẽ hiện input nhập mã thuê bao
- Gọi API để xác thực mã thuê bao

### 5. Màn hình chờ kích hoạt
- Countdown timer hiển thị ngày, giờ, phút, giây
- Dữ liệu thời gian được lấy từ API
- Timer tự động đếm ngược

## Cách sử dụng

### Mở ứng dụng
1. Mở file `index.html` trong trình duyệt web
2. Ứng dụng sẽ hiển thị màn hình chọn icon ban đầu

### Test flow hoàn chỉnh
1. **Màn hình chọn icon:**
   - Click vào bất kỳ icon nào
   - Chuyển sang màn hình đăng nhập

2. **Màn hình đăng nhập:**
   - Chọn mã quốc gia (mặc định: Việt Nam +84)
   - Nhập số điện thoại (ví dụ: 0912345678)
   - Nhập mã phần mềm: `ADMIN` hoặc `123456`
   - Click "ĐĂNG NHẬP"

3. **Màn hình loading:**
   - Chờ progress bar chạy đến 100%
   - Tự động chuyển sang màn hình đăng ký gói

4. **Màn hình đăng ký gói:**
   - Click vào một trong 4 gói
   - Nhập mã thuê bao: `VIP2024` hoặc `THUEBAO123`
   - Click "KÍCH HOẠT"

5. **Màn hình chờ kích hoạt:**
   - Xem countdown timer đếm ngược
   - Timer bắt đầu từ 4 phút 46 giây

## Cấu trúc dự án

```
phone-tracking-app/
├── index.html          # File HTML chính
├── script.js           # File JavaScript xử lý logic
└── README.md           # File hướng dẫn này
```

## Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling với glass effect, animations
- **JavaScript ES6**: Logic xử lý và tương tác
- **TailwindCSS CDN**: Framework CSS utility-first
- **Responsive Design**: Tương thích mobile và desktop

## API Mock

Ứng dụng sử dụng mock API để demo:

### API xác thực mã phần mềm
- **Endpoint**: Mock function `validateSoftwareCode()`
- **Mã hợp lệ**: `ADMIN`, `123456`
- **Response time**: 1 giây

### API xác thực mã thuê bao
- **Endpoint**: Mock function `validateSubscriptionCode()`
- **Mã hợp lệ**: `VIP2024`, `THUEBAO123`
- **Response time**: 1 giây

### API lấy thời gian countdown
- **Endpoint**: Mock function `getCountdownTime()`
- **Response**: `{ days: 0, hours: 0, minutes: 4, seconds: 46 }`
- **Response time**: 0.5 giây

## Tùy chỉnh

### Thay đổi mã xác thực
Chỉnh sửa trong file `script.js`:

```javascript
// Thay đổi mã phần mềm hợp lệ
function validateSoftwareCode(code) {
    return code === "YOUR_CODE" || code.toUpperCase() === "ADMIN";
}

// Thay đổi mã thuê bao hợp lệ
function validateSubscriptionCode(code) {
    return code.toUpperCase() === "YOUR_SUBSCRIPTION_CODE";
}
```

### Thay đổi thời gian countdown
Chỉnh sửa trong function `getCountdownTime()`:

```javascript
resolve({
    days: 0,
    hours: 0,
    minutes: 10,  // Thay đổi số phút
    seconds: 0    // Thay đổi số giây
});
```

### Thêm thông báo mới
Chỉnh sửa mảng `notifications` trong `script.js`:

```javascript
const notifications = [
    "Tài khoản 0399xxx090 kích hoạt thành công",
    "Thêm thông báo mới ở đây",
    // ...
];
```

## Triển khai

### Triển khai local
1. Tải toàn bộ thư mục dự án
2. Mở file `index.html` bằng trình duyệt

### Triển khai web server
1. Upload toàn bộ file lên web server
2. Truy cập qua URL của server

## Lưu ý

- Ứng dụng sử dụng mock API, cần thay thế bằng API thật khi triển khai production
- Giao diện được thiết kế responsive, tương thích với mobile và desktop
- Các icon hiện tại sử dụng emoji, có thể thay thế bằng icon font hoặc SVG
- Background sử dụng gradient CSS, có thể thay thế bằng hình ảnh nếu cần

## Hỗ trợ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng liên hệ qua:
- Email: support@example.com
- Hotline: 1900-xxxx
- Zalo: Admin

