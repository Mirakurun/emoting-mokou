exports.logout = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    }
    res.clearCookie("emoting_mokou_sid");
    return res.status(204).send();
  });
};
