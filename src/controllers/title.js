import * as services from "../services";
import { interalServerError, badRequest } from "../middlewares/handleError";
import { title, id_title, comment } from "../helpers/joi_schema";
import joi from "joi";

export const getTitles = async (req, res) => {
  try {
    console.log(1);
    const response = await services.getTitle(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
