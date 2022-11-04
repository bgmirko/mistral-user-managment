import { UserService } from "../services/userService";

const SPEC_CHAR_REGEX = /[- _/]/ig;

export class UserController {
  static async getUsers(req, res) {
    try {
      const { rows, count } = await UserService.getUsers(req.query);
      res.json({
        success: true,
        data: {
          users: rows,
          totalCount: count,
        },
        message: "List of users fetch successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await UserService.getUserByEmail(req.body.email);
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      const newUser = await UserService.createUser(req.body);
      res.json({
        success: true,
        data: newUser,
        message: "User is created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const uuid = req.params.id;
      const user = await UserService.getUserById(uuid);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User is not found",
        });
      }
      res.json({
        success: true,
        message: "User is deleted successfully",
      });
      await UserService.deleteUser(uuid);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const uuid = req.params.id;
      const user = await UserService.getUserById(uuid);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      const updatedUser = await UserService.updateUser(uuid, req.body);
      res.json({
        success: true,
        data: {
          user: updatedUser,
        },
        message: "User is updated successfully",
      });
    } catch (error) {
      res.status(400).json({
        code: error?.code ?? 400,
        success: false,
        message: error.message,
      });
    }
  }
}
