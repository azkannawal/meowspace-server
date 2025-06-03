const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const statusRoutes = require("./routes/statusRoutes");
const catRoutes = require("./routes/catRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

require("./models/user");
require("./models/status");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/users", statusRoutes);
app.use("/users", catRoutes);
app.use("/payments", paymentRoutes);

sequelize.sync({ alter: true }).then(() => {
// sequelize.sync({ force: true }).then(() => {
//   console.log('Database has been reset.');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
