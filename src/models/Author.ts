import { model, Schema } from "mongoose";

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Author = model("Author", authorSchema);

export default Author;
