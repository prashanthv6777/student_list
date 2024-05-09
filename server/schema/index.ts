import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      // This can be utilised after login integration if needed, Will be updated as ref field.
      type: String,
      default: null,
    },
  },

  // timestamps used to maintain 'created at' and 'updated at' properties in the document.
  { timestamps: true }
);

export { noteSchema };
