const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
      type: String,
      required: [true, 'Please provide student email address'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email format'
      ]
    },
    course: {
      type: String,
      required: [true, 'Please specify student course'],
      trim: true
    },
    marks: {
      type: Number,
      required: [true, 'Please specify student marks'],
      min: [0, 'Marks cannot be less than 0'],
      max: [100, 'Marks cannot exceed 100']
    }
  },
  {
    timestamps: true
  }
);

StudentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Student', StudentSchema);
