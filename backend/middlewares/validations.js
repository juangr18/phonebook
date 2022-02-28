import book from "../model/book.js";

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
    req.body = existContact;
    next();
  } else {
    res.status(400).send({ message: "Contact does not exist." });
  }
};

export { nameValid, contactExist, noExistContact };
