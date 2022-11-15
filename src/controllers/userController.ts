import { UserService } from "../services/userService";
import db from "../database/models";

class UserController {
  private userService: UserService;

  constructor(){
    console.log("----> user controller has started....");
    this.userService = new UserService(db);
  }

  async getUsers(req, res) {
    try {
      const { rows, count } = await this.userService.getUsers(req.query);
      res.json({
        success: true,
        data: {
          users: rows,
          totalCount: count,
        },
        message: "List of users fetch successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.getUserByEmail(req.body.email);
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      const newUser = await this.userService.createUser(req.body);
      res.json({
        success: true,
        data: newUser,
        message: "User is created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const uuid = req.params.id;
      const user = await this.userService.getUserById(uuid);
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
      await this.userService.deleteUser(uuid);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const uuid = req.params.id;
      const user = await this.userService.getUserById(uuid);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      const updatedUser = await this.userService.updateUser(uuid, req.body);
      res.json({
        success: true,
        data: {
          user: updatedUser,
        },
        message: "User is updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const userController = new UserController();
