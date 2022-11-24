const Vacation = require("./models/vacation");
const vacationInSeasonListener = require("./models/vacationInSeasonListener");

module.exports = {
  getVacations: async (options = {}) => Vacation.find(options),
  addVacationlnSeasonListener: async (email, sku) => {
    await vacationInSeasonListener.updateOne({ email }, { $push: { skus: sku } }, { upsert: true });
  },
};
