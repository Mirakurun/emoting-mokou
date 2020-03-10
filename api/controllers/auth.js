exports.logout = (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.error(error);
    }
    res.redirect('/');
  });
};
