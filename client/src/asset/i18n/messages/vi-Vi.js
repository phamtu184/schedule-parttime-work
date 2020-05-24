import { LOCALES } from "../locals";

export default {
  [LOCALES.VIETNAMESE]: {
    english: "tiếng anh",
    vietnamese: "tiếng việt",
    // router
    home: "trang chủ",
    calendar: "lịch làm việc",
    users: "nhân viên",
    newUser: "thêm nhân viên",
    customer: "khách hàng",
    setting: "cài đặt",
    management: "quản lý",
    // user section
    new: "thêm",
    remove: "xóa",
    enable: "kích hoạt",
    disable: "vô hiệu",
    viewBy: "hiển thị",
    roles: "vai trò",
    editProfile: "hồ sơ",
    logout: "đăng xuất",
    username: "tên đăng nhập",
    fullname: "họ tên",
    password: "mật khẩu",
    confirmPassword: "xác nhận mật khẩu",
    userId: "mã nhân viên",
    phonenumber: "số điện thoại",
    // roles
    manager: "quản lý",
    storeManager: "cửa hàng trưởng",
    cook: "phụ bếp",
    receptionist: "nhân viên lễ tân",
    server: "phục vụ",
    save: "lưu",
    reset: "làm mới",
    // validate register form
    require: "vui lòng nhập {title}",
    whitespace: "{title} không được có khoảng trống",
    max: "{title} không được quá {characters} kí tự",
    min: "{title} ít nhất {characters} kí tự",
    matchPassword: "Mật khẩu và xác nhận mật khẩu không giống nhau",
    len: "{title} phải chứa {characters} kí tự",
    numberValid: "{title} phải là {type}",
    number: "số",
    // event
    userExist: "mã nhân viên hoặc tên đăng nhập đã tồn tại",
    serverError: "lỗi server",
    addUserSuccess: "Thêm nhân viên thành công",
    loginSuccess: "đăng nhập thành công",
    loginFail: "tên đăng nhập không tồn tại hoặc sai mật khẩu",
    // feedback
    success: "thành công",
    error: "Lỗi",
  },
};
