import { LOCALES } from "../locals";

export default {
  [LOCALES.ENGLISH]: {
    english: "english",
    vietnamese: "vietnamese",
    // router
    home: "home",
    calendar: "calendar",
    users: "users",
    newUser: "new user",
    customer: "customer",
    setting: "setting",
    management: "management",
    // user section
    new: "new",
    remove: "remove",
    enable: "enable",
    disable: "disable",
    viewBy: "view by",
    roles: "roles",
    editProfile: "edit profile",
    logout: "logout",
    username: "username",
    fullname: "fullname",
    password: "password",
    confirmPassword: "confirm password",
    userId: "id user",
    phonenumber: "phone number",
    // roles
    manager: "manager",
    storeManager: "store manager",
    cook: "cook",
    receptionist: "receptionist",
    server: "server",
    save: "save",
    reset: "reset",
    // validate register form
    require: "please input {title}",
    whitespace: "{title} cannot be empty",
    max: "{title} cannot be longer than {characters} characters",
    min: "{title} must be at least {characters} characters",
    matchPassword: "Password and confirm password do not match!",
    len: "{title} must be exactly {characters} characters",
    numberValid: "{title} is not a valid {type}",
    number: "number",
    // event
    userExist: "user id or username has exist",
    serverError: "server error",
    addUserSuccess: "add user success",
    loginSuccess: "login success",
    loginFail: "username dosen't exist or wrong password",
    // feedback
    success: "success",
    error: "error",
  },
};
