class User {
  constructor(user, cash, xu, xudie) {
    this.user = user;
    this.cash = cash;
    this.xu = xu;
    this.xudie = xudie;
  }

  getUserInfo = () => {
    return {
      user: this.user,
      cash: this.cash,
      xu: this.xu,
      xudie: this.xudie,
    };
  };

  bonusCash = (cashBonus) => {
    this.cash += cashBonus;
    return this.cash;
  };

  deductionCash = (cashDeduction) => {
    this.cash -= cashDeduction;
    return this.cash;
  };
}
