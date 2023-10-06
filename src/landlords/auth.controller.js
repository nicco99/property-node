const knex = require("../db/fixtures/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function create(req, res, next) {
  const { pasword, email } = req.body;

  try {
    const landlord = await knex("landlords")
      .select("*")
      .where({ email: email })
      .first();

    if (landlord) {
      const isPasswordMatch = await bcrypt.compare(pasword, landlord.pasword);
      if (isPasswordMatch) {
        // Passwords match
        const token = jwt.sign({ id: landlord.id }, "3ecret");

        res.json({ token: token, landlord: landlord });
      } else {
        // Passwords do not match
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // Landlord not found
      res.status(404).json({ message: "Email invalid" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create: [create],
};
