import { model, Schema } from "mongoose";

const tagsSchema = new Schema({
  name: {
    type: String,
  },

  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Tag = model("Tag", tagsSchema);

export default Tag;
