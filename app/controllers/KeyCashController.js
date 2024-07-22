import {
  getAllDocument,
  getDocument,
  insertDocument,
} from "../config/database.js";

import { ObjectId } from "mongodb";

class KeyCashController {
  constructor() {
    this.getListKey = this.getListKey.bind(this);
  }

  getListKey = async (req, res) => {
    try {
      const data = await getAllDocument("key_cash");
      if (data.length > 0) {
        return res.status(200).json({
          status: 200,
          message: `Có ${data.length} key trong dữ liệu`,
          "data-list": data,
        });
      }
      return res.status(404).json({
        status: 404,
        message: "Không tìm thấy dữ liệu key nào",
      });
    } catch (error) {
      console.log(error);
    }
  };

  generatedKey = async (req, res) => {
    try {
      const requestObject = {
        user: req.body.user,
        cash: req.body.cash,
      };

      if (!requestObject.user || !requestObject.cash) {
        return res.status(400).json({
          status: 400,
          message: "Require user and cash",
        });
      }

      const keyIsExists = await getDocument("key_cash", {
        user: req.body.user,
      });

      if (keyIsExists) {
        return res.status(409).json({
          status: 409,
          message: "This user has a key",
        });
      }

      await insertDocument("key_cash", requestObject);

      return res.status(200).json({
        status: 200,
        message: "Create key success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  checkedKey = async (req, res) => {
    try {
      if (!req.query.key) {
        return res.status(400).json({
          status: 400,
          message: "Please input your key",
        });
      }

      const key = new ObjectId(req.query.key);
      const checkedKey = await getDocument("key_cash", {
        _id: key,
      });

      if (checkedKey) {
        return res.status(200).json({
          status: 200,
          message: "This key is available",
        });
      }
      return res.status(404).json({
        status: 404,
        message: "This key not found",
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default KeyCashController;
