import book from "../model/book.js";

const isChange = async (contact) => {
  let isChange = false;
  const contactData = await book.findOne({
    name: contact.name,
    phoneNumber: contact.phoneNumber,
    cellNumber: contact.cellNumber,
  });
  return contactData ? isChange : (isChange = true);
};

export { isChange };
