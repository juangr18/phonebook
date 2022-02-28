import express from "express";
import bookController from "../controller/book.js";
import { nameValid, contactExist, noExistContact, isLimit } from "../middlewares/validations.js";
const router = express.Router();

router.post("/register", [nameValid, isLimit, noExistContact], bookController.registerPhoneBook);
router.get("/list/:name?", bookController.listBook);
router.put("/update", [nameValid, contactExist], bookController.updateBook);
router.get("/available", bookController.availableContact);
router.get("/limit", bookController.whatLimit);
router.delete("/delete", [nameValid, contactExist], bookController.deleteBook);

export default router;
