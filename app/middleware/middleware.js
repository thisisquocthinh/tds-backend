import { ADMIN_TOKEN } from "../constants/adminAccount.js";

export const authenticateCookie = (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized, No token provided.",
    });
  }

  if (token === ADMIN_TOKEN) {
    return next();
  }

  return res.status(401).json({
    status: 401,
    message: "Unauthorized, Invalid token.",
  });
};
