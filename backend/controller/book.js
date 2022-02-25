import book from "../model/book.js";

const LIMIT = 10;

const registerPhoneBook = async (req, res) => {
  const isFullList = await book.count();
  if (isFullList === LIMIT)
    return res.status(400).send({ message: "The directory is filled" });
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data." });
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

export default { registerPhoneBook, listBook };
