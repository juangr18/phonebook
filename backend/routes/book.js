import express from "express";
import bookController from "../controller/book.js";

const router = express.Router();

router.post("/register", bookController.registerPhoneBook);
router.get("/list/:name?", bookController.listBook);
router.put("/update", bookController.updateBook);
router.get("/available", bookController.availableContact);
router.get("/limit", bookController.whatLimit);

export default router;