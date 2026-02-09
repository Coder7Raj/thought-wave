import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "no token, authorization denied" });
    }

    // verify token
    const decodeToken = jwt.verify(token, process.env.jwtSecret);
    if (!decodeToken) {
      return res.status(400).json({ message: "token is not valid" });
    }

    req.userId = decodeToken.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "is auth error" });
  }
};
