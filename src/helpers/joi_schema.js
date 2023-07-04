import joi from "joi";

export const username = joi.string().required();

export const password = joi
  .string()
  .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
  .required();

export const work = joi.string().required();
export const bid = joi.number().required();
export const id_title = joi.number().required(); // alphanum nghia la k chua ki tu dac biet
export const comment = joi.string().required();
export const bids = joi.number().required();
export const cmt = joi.string().required();
export const id_cmt = joi.number().required();
