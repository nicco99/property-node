const propertiesService = require("./properties.service");
const hasProperties = require("../errors/hasProperties");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = ["name", "county", "sub_county"];
const hasRequiredProperties = hasProperties("name", "county", "sub_county");
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

async function propertyExists(req, res, next) {
  const property = await propertiesService.read(req.params.propertyId);

  if (property) {
    res.locals.property = property;
    return next();
  }
  next({ status: 404, message: "property not found" });
}

function create(req, res, next) {
  propertiesService
    .create(req.body)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

async function read(req, res, next) {
  const { property } = res.locals;
  res.json({ data: property });
}

async function list(req, res) {
  const data = await propertiesService.list();
  res.json({ data });
}
async function update(req, res, next) {
  const updateProperty = {
    ...req.body,
    id: res.locals.property.id,
  };
  const property = await propertiesService.update(updateProperty);
  res.json({ data: property });
}
async function destroy(req, res, next) {
  const { property } = res.locals;
  await propertiesService.destroy(property.id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasRequiredProperties, create],
  list: [asyncErrorBoundary(list)],
  read: [hasOnlyValidProperties, asyncErrorBoundary(propertyExists), read],
  update: [
    asyncErrorBoundary(propertyExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(propertyExists), asyncErrorBoundary(destroy)],
};
