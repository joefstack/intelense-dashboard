const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const Session = require("express-session"),
  bodyParser = require("body-parser"),
  FileStore = require("session-file-store")(Session),
  config = require("./config/default"),
  flash = require("connect-flash");

const app = express();

// connect db
connectDB();

// server middleware config
app.use(express.json({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("public"));
app.use(flash());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(
  Session({
    store: new FileStore({
      path: "./sessions"
    }),
    secret: config.sessionSecret,
    maxAge: Date().now + 60 * 1000 * 30,
    resave: true,
    saveUninitialized: true
  })
);

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => {
  res.render("index");
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
