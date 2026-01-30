Đây là nội dung file README.md đã được biên tập lại để phản ánh đúng quy trình thiết lập dự án của bạn, giúp người mới dễ dàng tiếp cận hơn:

🛠 Hướng dẫn thiết lập (Setup)
Để chạy dự án ở môi trường cục bộ, vui lòng thực hiện các bước sau:

1. Cấu hình biến môi trường
Tạo file .env (hoặc .env.local) từ mẫu .env.example và thiết lập các giá trị sau:

NEXT_PUBLIC_API_URL: Trỏ về địa chỉ API Backend của bạn.

Cấu trúc: http://localhost:xxxx/api (với xxxx là cổng Backend của bạn).

NEXTAUTH_SECRET: Chuỗi bí mật dùng để bảo mật NextAuth.

Bạn có thể truy cập UUID Online để copy một chuỗi ngẫu nhiên.

2. Cài đặt và Khởi chạy
Mở terminal tại thư mục gốc và chạy các lệnh sau:

Bash

# Cài đặt các thư viện cần thiết
npm install

# Chạy server ở chế độ phát triển
npm run dev
3. Truy cập ứng dụng
Sau khi terminal báo khởi động thành công, hãy mở trình duyệt và truy cập trực tiếp vào trang Đăng nhập tại:

👉 http://localhost:3000/auth/login