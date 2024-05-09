import express from "express";
import { saveNotes, fetchAllNotes, getNote, updateNote, deleteNote } from "../controller/notes";
const router = express.Router();

router.get("/", fetchAllNotes);
router.post("/", saveNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;