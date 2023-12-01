const axios = require("axios");

export default function (req, res) {
  axios
    .get("https://mos.ru/rss")
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.end(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Ошибка при получении данных" });
    });
}
