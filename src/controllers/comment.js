import * as services from "../services";
import db from "../models";
import { interalServerError, badRequest } from "../middlewares/handleError";
import {
  work,
  comment,
  id_title,
  bid,
  bids,
  cmt,
  id_cmt,
} from "../helpers/joi_schema";
import joi from "joi";

// create books
export const createNewComment = async (req, res) => {
  try {
    // kiểm tra đầu vào có đúng hay không
    console.log(5);
    const { error } = joi.object({ id_cmt, cmt }).validate({ ...req.body });
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    console.log(2);
    // nếu đầu vào đúng thì sẽ thực hiện tiếp qua file service
    const response = await services.createComments(req.body);
    console.log(3);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

// export const getComment = async (req, res) => {
//   try {
//     // kiểm tra đầu vào có đúng hay không
//     console.log(5);
//     const { error } = joi.object({ id_cmt }).validate({ ...req.body });
//     if (error) {
//       return badRequest(error.details[0].message, res);
//     }
//     console.log(2);
//     // nếu đầu vào đúng thì sẽ thực hiện tiếp qua file service
//     const response = await services.getComment(req.body);
//     console.log(3);
//     return res.status(200).json(response);
//   } catch (error) {
//     return interalServerError(res);
//   }
// };
export const getComment = async (req, res) => {
  try {
    // kiểm tra đầu vào có đúng hay không
    console.log(3);
    // nếu đầu vào đúng thì sẽ thực hiện tiếp qua file service
    const response = await services.getComment(req.query);

    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
