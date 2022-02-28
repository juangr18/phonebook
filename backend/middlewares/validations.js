import book from "../model/book.js";

const LIMIT = 10;

const nameValid = (req, res, next) => {
  return req.body.name
    ? next()
    : res.status(400).send({ message: "Incomplete data" });
};

/**
 * Validate that there is no contact for register
 */
const noExistContact = async (req, res, next) => {
  const existPhone = await book.findOne({ name: req.body.name });

  return existPhone
    ? res.status(400).send({ message: "Already exists" })
    : next();
};

/**
 * Validate contact exists
 */
const contactExist = async (req, res, next) => {
  const existContact = await book.findOne({ name: req.body.name });
  if (existContact) {
    req.body._id = existContact._id;
    next();
  } else {
    res.status(400).send({ message: "Contact does not exist." });
  }
};

const isLimit = async (req, res, next) => {
  const isFullList = await book.count();
  return isFullList === LIMIT
    ? res.status(400).send({ message: "The directory is filled" })
    : next();
};

export { nameValid, contactExist, noExistContact, isLimit };
