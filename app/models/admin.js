import { ADMIN_USERNAME } from "../constants/adminAccount.js";

class Admin {
  constructor(username, password, fullName) {
    this.username = username;
    this.password = password;
    this.fullName = fullName;
  }

  getAdminName = () => {
    this.fullName = ADMIN_USERNAME;
  };
}

export default Admin;
