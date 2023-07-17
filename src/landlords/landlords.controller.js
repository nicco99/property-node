const bcrypt = require("bcrypt");
const landlordsService = require("./landlords.service");
const hasProperties = require("../errors/hasProperties");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "email",
  "p_number",
  "username",
  "pasword",
];
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "email",
  "p_number",
  "username",
  "pasword"
);
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function landlordExists(req, res, next) {
  const landlord = await landlordsService.read(req.params.landlordId);

  if (landlord) {
    res.locals.landlord = landlord;
    return next();
  }
  next({ status: 404, message: "landlord not found" });
}

async function create(req, res, next) {
  const { pasword, ...userData } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(pasword, 10);

    // Create the user with the hashed password
    const user = {
      ...userData,
      pasword: hashedPassword,
    };

    // Call the service to create the user
    const createdUser = await landlordsService.create(user);

    res.status(201).json({ data: createdUser });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  const { landlord } = res.locals;
  res.json({ data: landlord });
}

async function list(req, res) {
  const data = await landlordsService.list();
  res.json({ data });
}
async function update(req, res, next) {
  const updateLandlord = {
    ...req.body,
    id: res.locals.landlord.id,
  };
  const landlord = await landlordsService.update(updateLandlord);
  res.json({ data: landlord });
}
async function destroy(req, res, next) {
  const { landlord } = res.locals;
  await landlordsService.destroy(landlord.id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasRequiredProperties, create],
  list: [asyncErrorBoundary(list)],
  read: [hasOnlyValidProperties, asyncErrorBoundary(landlordExists), read],
  update: [
    asyncErrorBoundary(landlordExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(landlordExists), asyncErrorBoundary(destroy)],
};
