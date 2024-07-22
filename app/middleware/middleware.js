export const checkSession = (req, res, next) => {
  if (req.session && req.session.User) {
    next();
  } else {
    return res.redirect("user/login");
  }
};

export const redirectIfLoggedIn = (req, res, next) => {
  if (req.session && req.session.User) {
    return res.redirect("/");
  } else {
    next();
  }
};
