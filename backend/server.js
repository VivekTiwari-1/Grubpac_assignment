// Only require dotenv if we are NOT in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
