import express from "express"
import {
  createANotes,
  deleteANotes,
  getAllNotes,
  getNoteById,
  updateANotes
} from "../controllers/notesControllers.js";

const router = express.Router()

router.get("/",getAllNotes)
router.get("/:id",getNoteById)
router.post("/", createANotes)
router.put("/:id", updateANotes)
router.delete("/:id", deleteANotes)


export default router;
