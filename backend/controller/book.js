import book from "../model/book.js";

const registerPhoneBook = async (req, res) => {
  if (!req.body.name)
    return res.status(400).send({ mesaage: "Incomplete data." });
  if (book.find(req.body.name))
    return res.status(400).send({ mesaage: "Already exists" });

  let schema = new book({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    cellNumber: req.body.phoneNumber,
  });
  const phoneNumberSave = await schema.save();
  return phoneNumberSave
    ? res.status(200).send({ mesaage: "Register successful" })
    : res.status(500).send({ mesaage: "Error register number" });
};

const listNumber = async (req, res) => {
  let listNumbers = book.find({ name: new RegExp(req.params["name"]) });
  return listNumbers
    ? res.status(200).send({ listNumber })
    : res.status(400).send({ mesaage: "No search results" });
};

export default { registerPhoneBook, listNumber };
