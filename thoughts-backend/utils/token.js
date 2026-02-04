import jwt from "jsonwebtoken";

const getToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.jwtSecret, {
      expiresIn: "7d",
    });
    return token;
  } catch (err) {
    console.error("get token error", err);
  }
};

export default getToken;
