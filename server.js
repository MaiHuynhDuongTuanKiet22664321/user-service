const app = require("./src/app");
require('dotenv').config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, '0.0.0.0', () => {
    console.log("=======================================");
    console.log(` SERVER USER SERVICE ĐANG CHẠY`);
    console.log(` URL: http://172.16.40.223:${PORT}`);
    console.log("=======================================");
});