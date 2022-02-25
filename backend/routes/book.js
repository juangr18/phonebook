import express from "express";
import bookController from "../controller/book.js";

const router = express.Router();

router.post("/register", bookController.registerPhoneBook);
router.get("/list", bookController.listNumber);

export default router;
