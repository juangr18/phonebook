import express from "express";
import bookController from "../controller/book.js";
import { contactExist, nameValid } from "../middleware/validations.js";
const router = express.Router();

router.post("/register", [nameValid], bookController.registerPhoneBook);
router.get("/list/:name?", bookController.listBook);
router.put("/update", [nameValid], bookController.updateBook);
router.get("/available", bookController.availableContact);
router.get("/limit", bookController.whatLimit);
router.delete("/delete", [nameValid, contactExist], bookController.deleteBook);

export default router;
