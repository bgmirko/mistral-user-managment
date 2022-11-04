import { Op, Transaction } from "sequelize";
import db from "../database/models";
import { User } from "../database/modelsTypes";

export class UserService {
  static async getUsers(query): Promise<any> {
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
      Object.assign(where.createdAt, { [Op.gte]: query.startDate });
    }
    if (query?.endDate) {
      Object.assign(where.createdAt, { [Op.lte]: query.endDate });
    }

    return db.User.findAndCountAll({
      attributes: { exclude: ["password", "permissionId"] },
      include: { model: db.Permission, as: 'Permission', attributes: ["id", "code", "description"] },
      where,
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
      order: ["createdAt"],
    });
  }

  static async getUserById(uuid: string): Promise<User> {
    return db.User.findOne({
      where: {
        uuid,
      },
      raw: true,
    });
  }

  static async createUser(userData: any): Promise<User> {
    const bcrypt = require('bcryptjs');
    return (
      await db.User.create({
        ...userData,
        ...(userData.password && { password: await bcrypt.hash(userData.password, 12)}) // update password if it is sent
      })
    ).toJSON();
  }

  static async deleteUser(uuid: string): Promise<boolean> {
    return db.User.destroy({
      where: {
        uuid,
      },
    });
  }

  /*
   * Update user data
   */
  static async updateUser(uuid: string, userData: any): Promise<User> {
    const bcrypt = require('bcryptjs');
    await db.User.update(
      {
        firstName: userData.firstName,
        permissionId: userData.permissionId,
        lastName: userData.lastName,
        email: userData.email,
        status: userData.status,
        username: userData.username,
        ...(userData.password && { password: await bcrypt.hash(userData.password, 12)}) // update password if it is sent
      },
      {
        where: { uuid },
      }
    );

    return this.getUserById(uuid);
  }

  static async getUserByEmail(email: string): Promise<User> {
    return db.User.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }
}
