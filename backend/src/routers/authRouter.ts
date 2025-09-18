import { Router } from "express";
import AuthController from "../controller/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validations";

const router = Router();

router.post(
  "/create-account",
  body("email").isEmail().withMessage("Ingrese un email válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener más de 8 caracteres"),
  body("username").notEmpty().withMessage("El username es obligatorio"),
  handleInputErrors,
  AuthController.createAccount
);
router.post(
  "/login",
  body("email").notEmpty().withMessage("El mail es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  AuthController.login
);

export default router;
