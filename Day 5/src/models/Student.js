const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long.']
    },
    email: {
      type: String,
      required: [true, 'Student email is required.'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        'Please enter a valid email address.'
      ]
    },
    course: {
      type: String,
      required: [true, 'Course name is required.'],
      trim: true
    },
    marks: {
      type: Number,
      required: [true, 'Marks are required.'],
      min: [0, 'Marks cannot be less than 0.'],
      max: [100, 'Marks cannot be greater than 100.']
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Student', studentSchema);
