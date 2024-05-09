const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Fulltime Students", "PartTime Students", "Alumni", "Teaching Assistant", "Uncategorized",
      ],
      message: "VALUE is not supported",
    },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true},
    creator: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema)