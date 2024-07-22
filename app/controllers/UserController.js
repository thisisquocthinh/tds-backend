import { getDocument, insertDocument } from "../config/database.js";
import ApiService from "../utils/ApiServices.js";

class UserController {
  constructor() {}
  loginAction = async (req, res) => {
    try {
      if (!req.query.token) {
        return res.status(400).send({
          status: 400,
          message: "Vui lòng nhập token của bạn",
        });
      }

      const userData = await ApiService.get(
        `/?fields=profile&access_token=${req.query.token}`
      );

      if (userData.error) {
        return res.status(400).send({
          status: 400,
          message: userData.error,
        });
      }

      const query = { user: userData.data.user };
      const data = await getDocument("user", query);

      if (data) {
        return res.status(200).send({ status: 200, userData: data });
      } else if (!data) {
        userData.data = {
          ...userData.data,
          cash: 0,
        };
        await insertDocument("user", userData.data);
      }

      return res.status(200).send({ status: 200, userData: userData.data });
    } catch (error) {
      console.log("Error fetching user data:", error);
      return;
    }
  };
}

export default UserController;
