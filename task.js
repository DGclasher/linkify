require("dotenv").config();
const mongoose = require("mongoose");
const moment = require("moment");
const URL = require("./models/urls");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

const deleteOldData = async () => {
  const oneMonthAgo = moment().subtract(1, "months").toDate();
  try {
    const result = await URL.deleteMany({ createdAt: { $lt: oneMonthAgo } });
    console.log(`${result.deletedCount} documents deleted`);
  } catch (error) {
    console.log(`Error deleting data: ${error}`);
  } finally {
    mongoose.connection.close();
  }
};

deleteOldData();
