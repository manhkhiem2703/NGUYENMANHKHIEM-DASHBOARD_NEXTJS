import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  birthday: { type: Date },
  city: { type: String },
  address: { type: String },
  age: { type: Number },
  gender: { type: String },
  numberphone: { type: String },
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' } // Thêm trường role
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
