import db from "../models";
import { Op } from "sequelize";
import { v4 as generateId } from "uuid";

//CREATE
export const createWorks = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(4);
      const response = await db.Work.findOrCreate({
        where: {
          work: body?.work,
        },
        defaults: body,
      });

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Created" : "Cannot create new work",
      });
    } catch (error) {
      reject(error);
    }
  });

//Get
export const getWorks = ({ name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, rest: true };
      console.log(3);
      if (name) query.work = { [Op.substring]: name };
      console.log(4);
      // ham tim kiem
      const response = await db.Work.findAll({
        where: query,
        ...queries,
        attributes: {
          //   exclude: ["id_title"],
          exclude: ["createdAt", "updatedAt"],
        },
        // include: [
        //   {
        //     model: db.Title,
        //     attributes: {
        //       exclude: ["createdAt", "updatedAt"],
        //     },
        //     as: "titleData",
        //   },
        // ],
      });

      console.log(5);
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Get" : "Cannot found work",
        bookData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
//UPDATE
// export const updateWorks = ({ bid, ...body }) =>
//   new Promise(async (resolve, reject) => {
//     console.log(1);
//     try {
//       const response = await db.Work.update(body, {
//         where: { id: bid },
//       });
//       console.log(bid);
//       resolve({
//         err: response[0] > 0 ? 0 : 1,
//         mes:
//           response[0] > 0
//             ? `${response[0]} work updated`
//             : "Cannot update new word ID not found",
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
export const updateWorks = ({ bid, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const work = await db.Work.findOne({ where: { id: bid } });
      if (!work) {
        return resolve({
          err: 1,
          mes: "Cannot update work. ID not found",
        });
      }
      await work.update(body);
      resolve({
        err: 0,
        mes: `Work ${bid} updated`,
      });
    } catch (error) {
      reject(error);
    }
  });

//Delete
// export const deleteWorks = ({ bids }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await db.Work.destroy({
//         where: { id: bids },
//       });
//       console.log(bids);
//       resolve({
//         err: response[0] > 0 ? 0 : 1,
//         mes: `${response} work(s) deleted`,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
export const deleteWorks = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Work.destroy({
        where: { id },
      });
      console.log(id);
      resolve({
        err: response > 0 ? 0 : 1,
        mes: `${response} work(s) deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
