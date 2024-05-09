import mongoose from "mongoose";
import { noteSchema } from "../schema";

const Notes = mongoose.model("Notes", noteSchema);

export { Notes };
