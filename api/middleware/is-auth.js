module.exports = (req, res, next) => {
  if (!req.user && req.path === "/profile") {
    return res.status(204).send();
  }
  if (!req.user) {
    return res.status(401).send();
  }
  return next();
};
