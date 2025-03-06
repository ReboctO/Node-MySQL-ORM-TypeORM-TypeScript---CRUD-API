import { Request, Response, Router } from "express";
import Joi from "joi";
import { validateRequest } from "../middleware/validate-request";
import { Role } from "../helpers/role";
import { userService } from "../users/user.service";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

export default router;

function getAll(req: Request, res: Response) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(res.json);
}

function getById(req: Request, res: Response) {
  userService
    .getById(Number(req.params.id))
    .then((user) => res.json(user))
    .catch(res.json);
}

function create(req: Request, res: Response) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "User created" }))
    .catch(res.json);
}

function update(req: Request, res: Response) {
  userService
    .update(Number(req.params.id), req.body)
    .then(() => res.json({ message: "User updated" }))
    .catch(res.json);
}

function _delete(req: Request, res: Response) {
  userService
    .delete(Number(req.params.id))
    .then(() => res.json({ message: "User deleted" }))
    .catch(res.json);
}

function createSchema(req: Request, res: Response, next: any) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: any) {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    role: Joi.string().valid(Role.Admin, Role.User).empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  }).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}
module.exports = router;
