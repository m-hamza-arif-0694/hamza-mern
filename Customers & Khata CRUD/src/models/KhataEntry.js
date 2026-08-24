import mongoose from 'mongoose';

const KhataEntrySchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required']
    },
    type: {
      type: String,
      enum: ['GAVE_CREDIT', 'GOT_PAYMENT', 'gave', 'got'],
      required: [true, 'Transaction type is required']
    },
    amount: {
      type: Number,
      required: [true, 'Transaction amount is required'],
      min: [1, 'Amount must be greater than 0'],
      max: [10000000, 'Amount cannot exceed Rs. 10,000,000']
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Bank Transfer', 'EasyPaisa', 'JazzCash', 'Cheque', 'Credit Card'],
      default: 'Cash'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    billNumber: {
      type: String,
      trim: true,
      default: ''
    },
    date: {
      type: Date,
      default: Date.now
    },
    balanceAfter: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

KhataEntrySchema.index({ customerId: 1, date: -1 });

export default mongoose.models.KhataEntry || mongoose.model('KhataEntry', KhataEntrySchema);
