/** @format */

const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, index: true },
    icon: { type: String, default: null },
    parent: {
      type: Types.ObjectId,
      ref: "Category",
      required: false,
    },
    parents: {
      type: [Types.ObjectId],
      ref: "Category",
      required: false,
      default: [],
    },
  },
  { virtuals: true, versionKey: false, id: false },
);

CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const CategoryModel = model("Category", CategorySchema);
module.exports = CategoryModel;
