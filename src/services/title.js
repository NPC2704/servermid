// import db from "../models";
// import { Op } from "sequelize";
// import { v4 as generateId } from "uuid";

// export const getTitle = ({ name, ...query }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const queries = { raw: true, rest: true };

//       if (name) query.title = { [Op.substring]: name };

//       // ham tim kiem
//       const response = await db.Title.findAll({
//         attributes: ["title"], // Chỉ lấy trường 'title'
//         where: query,
//         ...queries,
//         include: [
//           {
//             model: db.Work,
//             attributes: {
//               exclude: ["createdAt", "updatedAt"],
//             },
//             as: "workData",
//           },
//         ],
//       });

//       resolve({
//         err: response ? 0 : 1,
//         mes: response ? "Get" : "Cannot found books",
//         bookData: response,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
import { query } from "express";
import db from "../models";
import { Op } from "sequelize";

export const getTitle = async ({ ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, rest: true };
      console.log(1);
      const response = await db.Title.findAll({
        where: query,

        attributes: {
          exclude: ["code"],
        },
        include: [
          {
            model: db.Work,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            as: "id_Title",
          },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "Cannot found titls",
        titleData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
// export const getTitle = async ({ ...query }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const queries = { raw: true, rest: true };
//       console.log(1);
//       const response = await db.Title.findAll({
//         where: query,
//         attributes: {
//           exclude: ["code"],
//         },
//         include: [
//           {
//             model: db.Work,
//             attributes: {
//               exclude: ["createdAt", "updatedAt"],
//             },
//             as: "id_Title",
//           },
//         ],
//       });

//       // Gom nhóm dữ liệu theo title
//       const groupedData = response.reduce((acc, item) => {
//         if (acc[item.title]) {
//           acc[item.title].push(item);
//         } else {
//           acc[item.title] = [item];
//         }
//         return acc;
//       }, {});

//       resolve({
//         err: response ? 0 : 1,
//         mes: response ? "Got" : "Cannot found titles",
//         titleData: groupedData,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
