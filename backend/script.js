import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

// ✅ Plain text password directly hash karke save karo
const freshHash = await bcrypt.hash('1234', 12)

await mongoose.connection.collection('users').updateOne(
  { uid: 'admin1' },
  { $set: { password: freshHash } }
)

// Verify
const user = await mongoose.connection.collection('users').findOne({ uid: 'admin1' })
const match = await bcrypt.compare('1234', user.password)
console.log('Password in DB:', user.password)
console.log('Match test:', match) // ✅ true aana chahiye

process.exit()