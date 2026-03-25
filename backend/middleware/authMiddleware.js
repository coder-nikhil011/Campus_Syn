import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const verified = jwt.verify(token, "secretkey"); // move to .env later
    req.user = verified; // user id + role
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default auth;