const app = require("express")();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5230;

const Data = require("./models/Data");

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;
const db_config = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

app.get("/", async (req, res) => {
  const d = req.query.val || "custom-value";
  console.log("DATA TO ADD: ", d);
  const newData = new Data({
    value: d,
  });

  await newData.save();

  res.json({
    msg: "Data stored",
  });
});

app.get("/all", async (req, res) => {
  const data = await Data.find({});
  console.log("DATA: ", data);
  res.json(data);
});

mongoose
  .connect(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
    db_config
  )
  .then(() => {
    console.log("Drum Roll: DB nibba connected");
  })
  .catch((err) => {
    console.log("BD Connection Error bruhh -->", err);
  });

app.listen(PORT, () => {
  console.log(`I am alive on ${PORT}`);
});
