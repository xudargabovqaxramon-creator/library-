const role = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Token kerak" });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Ruxsat yo'q" });
    }

    next();
  };
};

module.exports = role