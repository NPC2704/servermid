import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(5);
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(5));
export const register = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { username: username },
        defaults: {
          username,
          password: hashPassword(password),
        },
      });
      // neu dung khi tai khoan chua dc tao va se cap token con sai thi tai khoan da dc tao va se k cap token nua
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              username: response[0].username,
              role_code: response[0].role_code,
            },
            process.env.JWT_SECRET,
            {
              // ngay het han token
              expiresIn: "5d",
            }
          )
        : null;

      // kiem tra email da dc tao chua
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is successfully!" : "username is used",
        access_token: token ? `Bearer ${token}` : token,
      });
      resolve({
        err: 0,
        mes: "register services",
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { username: username },
        raw: true,
      });
      // kiem tra mat kahu dung hay sai
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      // neu dung thi kiem tra token
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              username: response.username,
              role_code: response.role_code,
            },
            process.env.JWT_SECRET,
            {
              // ngay het han token
              expiresIn: "5d",
            }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login is successfully!"
          : response
          ? "Password is wrong"
          : "username have been registerd",
        access_token: token ? `Bearer ${token}` : token,
      });
      resolve({
        err: 0,
        mes: "register services",
      });
    } catch (error) {
      reject(error);
    }
  });
