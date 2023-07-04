import { query } from "express";
import db from "../models";
import { Op } from "sequelize";
import { v4 as generateId } from "uuid";

//CREATE
export const createComments = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Comment.findOrCreate({
        where: {
          cmt: body?.cmt,
        },
        defaults: body,
      });

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created" : "Cannot create new cmt",
      });
    } catch (error) {
      reject(error);
    }
  });

// export const getComment = (body) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const comments = await db.Comment.findAll({
//         where: {
//           id_cmt: body?.id_cmt,
//         },
//         attributes: ["cmt"], // Chỉ lấy thuộc tính cmt
//       });
//       resolve({
//         err: comments ? 0 : 1,
//         mes: comments ? "Got" : "Cannot found titls",
//         titleData: comments,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
export const getComment = ({ ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(1);
      const response = await db.Comment.findAll({
        where: query,

        attributes: ["cmt", "id_cmt", "createdAt", "id"],
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Cannot found cmt",
        titleData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
