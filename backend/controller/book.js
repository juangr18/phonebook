import book from "../model/book.js";
import { isChange } from "../service/isChange.js";

const LIMIT = 10;

const registerPhoneBook = async (req, res) => {
  let schema = new book({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    cellNumber: req.body.phoneNumber,
  });
  const phoneNumberSave = await schema.save();
  return phoneNumberSave
    ? res.status(200).send({ message: "Register successful" })
    : res.status(500).send({ message: "Error register number" });
};

const listBook = async (req, res) => {
  let listNumbers = await book.find({ name: new RegExp(req.params["name"]) });
  return listNumbers.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ listNumbers });
};

const updateBook = async (req, res) => {
  let hasChange = await isChange(req.body);
  console.log(req.body);
  if (!hasChange)
    return res.status(400).send({ message: "No change in the contact." });
  const bookEdit = await book.findByIdAndUpdate(req.body._id, {
    phoneNumber: req.body.phoneNumber,
    cellNumber: req.body.cellNumber,
  });
  console.log(bookEdit);
  return bookEdit
    ? res.status(200).send({ message: "Conctact updated." })
    : res.status(500).send({ message: "Error updating conctact." });
};

const deleteBook = async (req, res) => {
  const bookDelete = await book.findByIdAndDelete(req.body._id);
  return bookDelete
    ? res.status(200).send({ message: "Contact deleted." })
    : res.status(500).send({ message: "Error while deleting a contact." });
};

const availableContact = async (req, res) => {
  let contacts = await book.count();
  return contacts === 0
    ? res.status(400).send({ message: "No available contacts now" })
    : res.status(200).send({ message: "Available contacts now: " + contacts });
};

const whatLimit = async (req, res) => {
  let isFilled = await book.count();
  isFilled = LIMIT - isFilled;
  return isFilled === 0
    ? res.status(400).send({ message: "The directory is filled" })
    : res.status(200).send({
        message: `Directory limit is: ${isFilled}`,
      });
};

export default {
  registerPhoneBook,
  listBook,
  updateBook,
  deleteBook,
  availableContact,
  whatLimit,
};
