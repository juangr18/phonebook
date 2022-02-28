import book from "../model/book.js";

const LIMIT = 10;

const registerPhoneBook = async (req, res) => {
  const isFullList = await book.count();
  if (isFullList === LIMIT)
    return res.status(400).send({ message: "The directory is filled" });

  const existPhone = await book.findOne({ name: req.body.name });

  if (existPhone) return res.status(400).send({ message: "Already exists" });
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
  const bookEdit = await book.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    cellNumber: req.body.cellNumber,
  });
  return bookEdit
    ? res.status(200).send({ message: "Conctact updated." })
    : res.status(500).send({ message: "Error updating conctact." });
};

const deleteBook = async (req, res) => {
  const existContact = await book.findOne({name:req.body.name});
  if (!existContact)
    return res.status(400).send({ message: "Contact does not exist." });
  const bookDelete = await book.findByIdAndDelete(existContact._id);
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
