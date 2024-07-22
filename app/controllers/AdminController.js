import { getAllDocument } from "../config/database.js";

class AdminController {
  constructor() {
    this.showIndex = this.showIndex.bind(this);
  }

  showIndex = async (req, res) => {
    try {
      await connectToDatabase();
      const listData = await getAllDocument("key_cash");

      if (listData.length > 0) {
        await closeConnection();
        return res.render("admin/index", { listData });
      }
      await closeConnection();
      return res.render("admin/index", { listData });
    } catch (error) {
      return res.json({ message: "Error" });
    }
  };
}

export default AdminController;
