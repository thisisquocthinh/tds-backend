import { ObjectId } from "mongodb";
import { insertDocument } from "../config/database.js";
import moment from "moment";
import { config } from "dotenv";
config({ path: ".env" });

class PaymentController {
  constructor() {}
  _id = new ObjectId();

  createPayment = async (req, res) => {
    try {
      const request = {
        _id: this._id,
        user: req.body.user,
        money: req.body.money,
        description: req.body.description,
        payDate: moment().format("LLL"),
      };

      if (!request) {
        return res.status(400).json({
          status: 400,
          message: "Please input full payment info",
        });
      }

      await insertDocument("payment", request);

      return res.status(200).json({
        status: 200,
        message: "Nạp tiền thành công",
      });
    } catch (error) {
      console.error(error);
    }
  };

  getTransactions = async (req, res) => {
    try {
      console.log(process.env.API_KEY_CASSO);
      const fetchApi = await fetch("https://oauth.casso.vn/v2/userInfo", {
        method: "GET",
        headers: {
          Authorization: `Apikey ${process.env.API_KEY_CASSO}`,
        },
      });
      const response = await fetchApi.json();
      console.log(response.data);

      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
    }
  };
}

export default PaymentController;
