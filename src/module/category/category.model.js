/** @format */

const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, index: true },
    icon: { type: String, required: true },
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
  { versionKey: false, id: false, toJSON: { virtuals: true } },
);

CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});
// category.model.js

function autoPopulate() {
  this.populate([{ path: "children" }]);
}

CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);


const CategoryModel = model("Category", CategorySchema);
module.exports = CategoryModel;
