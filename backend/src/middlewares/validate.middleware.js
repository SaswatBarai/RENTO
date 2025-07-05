
import { ApiError } from "../utils/ApiError.js";
import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted = error.errors.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors: formatted });
    }
    return res.status(500).json({ error: "Something went wrong." });
  }
};
