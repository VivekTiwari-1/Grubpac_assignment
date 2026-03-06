const path = require("path");

// This creates an absolute path from the current file to the .env file
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
