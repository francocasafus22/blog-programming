import { Router } from "express";
import PostController from "../controller/PostController";
import { authenticate } from "../middlewares/authenticate";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validations";

const router = Router();

router.post(
  "/",
  body("title").notEmpty().withMessage("El titulo no puede ir vacio"),
  body("body").notEmpty().withMessage("El post no puede ir vacio"),
  handleInputErrors,
  authenticate,
  PostController.create
);
router.get("/", authenticate, PostController.getAllMyPosts);
router.delete(
  "/:postId",
  param("postId").isMongoId().withMessage("Debe ingresar un id válido"),
  handleInputErrors,
  authenticate,
  PostController.delete
);
router.put(
  "/:postId",
  param("postId").isMongoId().withMessage("Debe ingresar un id válido"),
  handleInputErrors,
  authenticate,
  PostController.update
);
router.get("/feed", authenticate, PostController.getFeed);
router.post(
  "/like/:postId",
  param("postId").isMongoId().withMessage("Debe ingresar un id válido"),
  handleInputErrors,
  authenticate,
  PostController.likePost
);
router.get(
  "/like/:postId",
  param("postId").isMongoId().withMessage("Debe ingresar un id válido"),
  handleInputErrors,
  authenticate,
  PostController.viewLikesDetails
);

export default router;
