const { Schema, model } = require("mongoose");

const vacationInSeasonListenerSchema = Schema({
  email: String,
  skus: [String],
});

module.exports = model("VacationInSeasonListener", vacationInSeasonListenerSchema);
