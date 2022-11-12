const type = process.env.NODE_ENV || "development";
const credentionals = require(`./credentials.${type}`);

module.exports = { credentionals };
