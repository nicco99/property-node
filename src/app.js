const express = require("express");
const app = express();
const morgan = require("morgan");
const propertiesRouter = require("./properties/properties.router");
const landlordsRouter = require("./landlords/landlords.router");
const contactsRouter = require("./contacts/contacts.router");
const landlordsLoginRouter = require("./landlords/landlordsLogin.router");
const cors = require("cors");
const jwt = require("jsonwebtoken");

function authorize(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token", token: token });
  }

  try {
    const decoded = jwt.verify(token, "3ecret");
    req.user = decoded; // Attach the decoded user information to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/properties", propertiesRouter);
// app.use("/landlords", authorize, landlordsRouter);
app.use(
  "/landlords",
  (req, res, next) => {
    if (req.method === "POST") {
      // Skip authorization middleware for create route
      next();
    } else {
      authorize(req, res, next);
    }
  },
  landlordsRouter
);

app.use("/landlord_login", landlordsLoginRouter);
app.use("/contact", contactsRouter);
// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
