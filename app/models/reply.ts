import mongoose, { Schema } from "mongoose";

const reviewReplySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewId: { type: Schema.Types.ObjectId, ref: "GameReview", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
});

const ReviewReply =
  mongoose.models.ReviewReply ||
  mongoose.model("ReviewReply", reviewReplySchema);
export default ReviewReply;
