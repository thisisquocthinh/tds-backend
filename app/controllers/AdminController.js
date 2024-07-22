import { getAllDocument } from "../config/database.js";
import {
  ADMIN_PASSWORD,
  ADMIN_TOKEN,
  ADMIN_USERNAME,
} from "../constants/adminAccount.js";

class AdminController {
  constructor() {
    this.adminLogin = this.adminLogin.bind(this);
  }

  adminLogin = async (req, res) => {
    try {
      const adminData = {
        username: req.body.username,
        password: req.body.password,
      };

      if (!adminData.username || !adminData.password) {
        return res.status(400).json({
          status: 400,
          message: "Please input username or password",
        });
      }

      if (
        adminData.username == ADMIN_USERNAME &&
        adminData.password === ADMIN_PASSWORD
      ) {
        res.cookie("adminToken", ADMIN_TOKEN, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          status: 200,
          message: "Login success!",
        });
      }

      return res.status(404).json({
        status: 404,
        message: "Wrong username or password",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default AdminController;
