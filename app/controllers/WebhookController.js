class WebhookController {
  webhookEventHandler = (req, res) => {
    let error = req.body.error;

    if (error != 0) {
      return;
    }

    let transactions = req.body.data;

    console.log(`Received ${transactions.length} transactions`);

    res.end("OK");
  };
}

export default WebhookController;
