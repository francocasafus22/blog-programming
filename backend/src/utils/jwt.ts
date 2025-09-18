import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Si el token es inválido o expiró
  }
};

export const generateJWT = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
