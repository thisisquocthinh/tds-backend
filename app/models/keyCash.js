class KeyCash {
  constructor(userId, cash, key) {
    this.key = key;
    this.userId = userId;
    this.cash = cash;
  }

  getAllKeyCashInfo = () => {
    return {
      key: this.key,
      userId: this.userId,
      cash: this.cash,
    };
  };
}
