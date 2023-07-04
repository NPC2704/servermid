import * as services from "../services";
import db from "../models";
import { interalServerError, badRequest } from "../middlewares/handleError";
import { work, comment, id_title, bid, bids } from "../helpers/joi_schema";
import joi from "joi";

// create books
export const createNewWork = async (req, res) => {
  try {
    // kiểm tra đầu vào có đúng hay không
    console.log(1);
    const { error } = joi.object({ work, id_title }).validate({ ...req.body });
    if (error) {
      return badRequest(error.details[0].message, res);
    }
    console.log(2);
    // nếu đầu vào đúng thì sẽ thực hiện tiếp qua file service
    const response = await services.createWorks(req.body);
    console.log(3);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};
//GET
export const getWork = async (req, res) => {
  console.log(1);
  try {
    const response = await services.getWorks(req.query);
    console.log(2);
    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

//UPDATE

export const updateWork = async (req, res) => {
  try {
    const { error } = joi.object({ bid }).validate({ bid: req.body.bid });

    if (error) {
      return badRequest(error.details[0].message, res);
    }
    const response = await services.updateWorks(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return interalServerError(res);
  }
};

export const deleteWork = async (req, res) => {
  let id = req.params.id;

  await db.Work.destroy({ where: { id: id } });

  res.status(200).send("Product is deleted !");
};
