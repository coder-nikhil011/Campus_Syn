import jwt from "jsonwebtoken";

// ✅ Verifies JWT token — attaches user to req
export const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ msg: "No token, access denied" });

  // ✅ Strip "Bearer " prefix before verifying
  const token = header.split(" ")[1];

  try {
    // ✅ Uses environment variable — not hardcoded string
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is invalid or expired" });
  }
};

// ✅ Role-based access — use after protect
// e.g. authorize("admin", "teacher")
export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      msg: `Access denied. Required: ${roles.join(" or ")}`,
    });
  }
  next();
};