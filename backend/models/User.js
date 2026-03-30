import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // ✅ removed duplicate "faculty" — use "teacher" consistently
      enum: ["student", "teacher", "organizer", "admin"],
      required: true,
    },

    // ✅ Student-specific fields
    semester:   { type: Number, default: null },
    department: { type: String, default: null },

    // ✅ Teacher-specific
    subject: { type: String, default: null },

    // ✅ Admin can deactivate accounts
    isActive: { type: Boolean, default: true },

    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Hash password before saving — CRITICAL security fix
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ✅ Helper method to compare passwords at login
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;