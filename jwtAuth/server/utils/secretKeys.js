require("dotenv").config();

const secretKey = process.env.SECRET;
const refreshKey = process.env.SECRET_REFRESH;
module.exports = { secretKey, refreshKey };
