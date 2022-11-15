import { Op } from "sequelize";
import User from "../database/models/user";
import bcrypt from "bcryptjs";

export class UserService {
  private db;

  constructor(db) {
    this.db = db;
  }

  async getUsers(query): Promise<any> {
    const where = query?.startDate || query?.endDate ? { createdAt: {} } : {};
    if (query?.firstName) {
      Object.assign(where, {
        firstName: { [Op.iLike]: `%${query.firstName}%` },
      });
    }
    if (query?.lastName) {
      Object.assign(where, { lastName: { [Op.iLike]: `%${query.lastName}%` } });
    }
    if (query?.email) {
      Object.assign(where, { email: { [Op.iLike]: `%${query.email}%` } });
    }
    if (query?.username) {
      Object.assign(where, { username: { [Op.iLike]: `%${query.username}%` } });
    }
    if (query?.status) {
      Object.assign(where, { banned: query.status });
    }
    if (query?.startDate) {
      Object.assign(where, { createdAt: { [Op.gte]: query.startDate } });
    }
    if (query?.endDate) {
      Object.assign(where, { createdAt: { [Op.lte]: query.endDate } });
    }

    return this.db.User.findAndCountAll({
      attributes: { exclude: ["password", "permissionId"] },
      include: {
        model: this.db.Permission,
        as: "permission",
        attributes: ["id", "code", "description"],
      },
      where,
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
      order: ["createdAt"],
    });
  }

  async getUserById(uuid: string): Promise<User> {
    return this.db.User.findOne({
      where: {
        uuid,
      },
      attributes: { exclude: ["password"] },
      raw: true,
    });
  }

  async createUser(userData: any): Promise<User> {
    return (
      await this.db.User.create({
        ...userData,
        ...(userData.password && {
          password: await bcrypt.hash(userData.password, 12),
        }), // update password if it is sent
      })
    ).toJSON();
  }

  async deleteUser(uuid: string): Promise<boolean> {
    return this.db.User.destroy({
      where: {
        uuid,
      },
    });
  }

  /*
   * Update user  data
   */
  async updateUser(uuid: string, userData: any): Promise<User> {
    await this.db.User.update(
      {
        firstName: userData.firstName,
        permissionId: userData.permissionId,
        lastName: userData.lastName,
        email: userData.email,
        status: userData.status,
        username: userData.username,
        ...(userData.password && {
          password: await bcrypt.hash(userData.password, 12),
        }), // update password if it is sent
      },
      {
        where: { uuid },
      }
    );

    return this.getUserById(uuid);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.db.User.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }
}
