# đồ án môn học quản lý nhân viên và sắp xếp lịch làm việc
công nghệ sử dụng: react, nodejs(express), mongodb
# mô tả
Hàng tuần quản lý sẽ tạo ra 1 bảng lịch làm được sắp tự động (đăng kí theo ca).
Mỗi nhân viên sẽ được cấp cho tài khoản đăng nhập hệ thống để xem lịch làm. Nhân viên được phân loại theo từng vai trò gồm: phục vụ, tiếp tân, phụ bếp. Mỗi nhân viên đăng kí giờ làm theo vai trò tương ứng.
Nhân viên muốn thay đổi lịch làm việc phải báo cho quản lý để quản lý sửa trên hệ thống.
Sau khi tạo bảng lịch làm đã được sắp giờ làm tự động, quản lý sẽ đăng lên hệ thống cho nhân viên xem lịch làm.
Vào cuối tháng quản lý lấy tất cả các lịch làm trong tháng đó để thống kê ra tổng giờ làm và tiền lương nhân viên VD: nhân viên A tháng 5 có tổng giờ làm là : 120h/tháng.
# feature
- sử dụng jwt để xác thực người dùng
- giao diện quản lý thân thiện
- sử dụng thuật toán tô màu để sắp xếp lịch làm việc
- chỉnh sửa hồ sơ người dùng
- đa ngôn ngữ
# sreen shot
- trang đăng nhập:
![image](https://user-images.githubusercontent.com/54318890/89145497-2bc13f00-d57b-11ea-89c9-c067b8acecfd.png)
- trang chủ:
![image](https://user-images.githubusercontent.com/54318890/89145894-42b46100-d57c-11ea-9433-826f90a88e79.png)
- giao diện quản lý nhân viên:
![image](https://user-images.githubusercontent.com/54318890/89145921-59f34e80-d57c-11ea-92e7-8c3f5b155fc6.png)
- thêm nhân viên:
![image](https://user-images.githubusercontent.com/54318890/89146089-e30a8580-d57c-11ea-917f-decfb66fd270.png)
- xem thông tin nhân viên:
![image](https://user-images.githubusercontent.com/54318890/89145967-7e4f2b00-d57c-11ea-8845-36c6b9ae370e.png)
- sửa thông tin nhân vien:
![image](https://user-images.githubusercontent.com/54318890/89146003-93c45500-d57c-11ea-8b6e-295595d91cee.png)
- thống kê tính số giờ làm, tiền lương nhân viên:
![image](https://user-images.githubusercontent.com/54318890/89146066-cb330180-d57c-11ea-8265-6b7a154f817d.png)
- cài đặt lịch làm việc
![image](https://user-images.githubusercontent.com/54318890/89146122-fc133680-d57c-11ea-9426-1a2605fdf658.png)
![image](https://user-images.githubusercontent.com/54318890/89146144-12b98d80-d57d-11ea-8f84-591b007539e4.png)
- tạo lịch làm việc
![image](https://user-images.githubusercontent.com/54318890/89146181-295fe480-d57d-11ea-9ed6-088f7480099b.png)
![image](https://user-images.githubusercontent.com/54318890/89146204-3aa8f100-d57d-11ea-9dca-92d4bb144a83.png)
- nhân viên chỉ có thể xem lịch làm việc:
![image](https://user-images.githubusercontent.com/54318890/89146333-8fe50280-d57d-11ea-9976-07c8b10e1556.png)
- đa ngôn ngữ
![image](https://user-images.githubusercontent.com/54318890/89146369-af7c2b00-d57d-11ea-8892-4f6487ab92e3.png)
