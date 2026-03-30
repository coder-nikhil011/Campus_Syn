// run once: node scripts/hashPasswords.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const users = await mongoose.connection.collection("users").find().toArray();

for (const user of users) {
  // skip already hashed passwords
  if (user.password.startsWith("$2b$")) continue;

  const hashed = await bcrypt.hash(user.password, 12);
  await mongoose.connection.collection("users").updateOne(
    { _id: user._id },
    { $set: { password: hashed } }
  );
  console.log(`✅ Hashed password for: ${user.uid}`);
}

console.log("Done!");
process.exit(0);