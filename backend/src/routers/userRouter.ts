import { Router } from "express";
import UserController from "../controller/UserController";
import { param } from "express-validator";
import { handleInputErrors } from "../middlewares/validations";

const router = Router();

router.get(
  "/:userId",
  param("userId").isMongoId().withMessage("Debe ingresar un id válido"),
  handleInputErrors,
  UserController.getProfile
);

export default router;
