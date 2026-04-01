import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter password: ", async (password) => {
  if (!password.trim()) {
    console.log("❌ Password cannot be empty");
    rl.close();
    return;
  }

  const hash = await bcrypt.hash(password.trim(), 12);

  console.log("\n✅ Hashed Password:");
  console.log(hash);

  rl.close();
});