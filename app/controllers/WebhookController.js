import ApiService, { ApiServiceCasso } from "../utils/ApiServices.js";
import { config } from "dotenv";

config({ path: ".env" });

const transaction_prefix = "SUPER";

const case_insensitive = false;

const expiration_date = 3;

const secure_token = "R5G4cbnN7uSAwfTd";
class WebhookController {
  constructor() {
    this.deleteWebhookByUrl = this.deleteWebhookByUrl.bind(this);
    this.getDetailUser = this.getDetailUser.bind(this);
    this.handleBankTransfer = this.handleBankTransfer.bind(this);
  }

  handleBankTransfer = (req, res, next) => {
    try {
      if (
        !req.header("secure-token") ||
        req.header("secure-token") != secure_token
      ) {
        return res.status(401).json({
          status: 401,
          message: "Missing secure-token or wrong secure-token",
        });
      }
      for (let item of req.body.data) {
        let orderId = this.parseOrderId(
          case_insensitive,
          transaction_prefix,
          item.description
        );
        if (!orderId) continue;
        if (
          (new Date().getTime() - new Date(item.when).getTime()) / 86400000 >=
          expiration_date
        )
          continue;
      }
      return res.status(200).json({
        code: 200,
        message: "success",
        data: null,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  userPaid = async (req, res, next) => {
    try {
      if (!req.body.accountNumber) {
        return res.status(404).json({
          code: 404,
          message: "Not found Account number",
        });
      }

      await this.syncTransaction(req.body.accountNumber);
      return res.status(200).json({
        status: 200,
        message: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };

  registerWebhook = async (req, res, next) => {
    try {
      await this.deleteWebhookByUrl(
        "https://dev.osteup.io.vn/api/v1/webhook-event-handler"
      );

      let data = {
        webhook: req.body.webhook,
        secure_token: secure_token,
        income_only: req.body.income_only,
      };

      let newWebhook = await this.createWebhook(data);
      let userInfo = await this.getDetailUser();

      return res.status(200).json({
        status: 200,
        message: "success",
        data: {
          webhook: newWebhook.data,
          userInfo: userInfo.data,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getDetailUser = async () => {
    let result = await ApiServiceCasso.get("/userInfo");
    return result;
  };

  syncTransaction = async (bankNumber) => {
    let result = await ApiServiceCasso.post("/sync", {
      bank_acc_id: bankNumber,
    });
    return result;
  };

  createWebhook = async (data) => {
    let result = await ApiServiceCasso.post("/webhooks", data);
    return result;
  };

  getDetailWebhookById = async (webhookId) => {
    let result = await ApiServiceCasso.get(`/webhooks/${webhookId}`);
    return result;
  };

  updateWebhookById = async (webhookId, data) => {
    let result = await ApiServiceCasso.put(`/webhooks/${webhookId}`, data);
    return result;
  };

  deleteWebhookById = async (webhookId) => {
    let result = await ApiServiceCasso.delete(`/webhooks/${webhookId}`);
    return result;
  };

  deleteWebhookByUrl = async (urlWebhook) => {
    let result = await ApiServiceCasso.delete(
      `/webhooks?webhook=${urlWebhook}`
    );
    return result;
  };

  parseOrderId = (caseInsensitive, transactionPrefix, description) => {
    let re = new RegExp(transaction_prefix);
    if (!caseInsensitive) re = new RegExp(transactionPrefix, "i");
    let matchPrefix = description.match(re);
    if (!matchPrefix) return null;
    let orderId = parseInt(
      description.substring(transactionPrefix.length, description.length)
    );
    return orderId;
  };
}

export default WebhookController;
