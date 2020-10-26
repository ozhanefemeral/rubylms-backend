const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  for: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'forModel',
  },
  forModel: {
    type: String,
    required: true,
    enum: ['Task', 'Student', "Solution", "Course"]
  },
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    autopopulate: { select: 'name' },
    refPath: 'byModel'
  },
  byModel: {
    type: String,
    required: true,
    enum: ["Student", "Teacher"]
  }
});

commentSchema.pre('save', async function (next) {
  if (this.isNew) {
    const commentedFor = await mongoose.model(this.forModel)
      .findById(this.for);
    commentedFor.comments.push(this);
    await commentedFor.save();
    if (this.byModel === "Teacher") {
      const commentedBy = await mongoose.model(this.byModel)
        .findById(this.by);
      commentedBy.comments.push(this);
    }
    next();
  } else {
    next();
  }
})

commentSchema.plugin(require('mongoose-autopopulate'));

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
