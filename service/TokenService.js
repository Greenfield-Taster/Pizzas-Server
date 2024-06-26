import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err instanceof jwt.TokenExpiredError) {
        reject(err, "Token is expired");
      }
      if (err instanceof jwt.JsonWebTokenError) {
        reject(err, "Invalid token");
      }
      resolve(decoded);
    });
  });
};
