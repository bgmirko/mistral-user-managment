import {Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DeletedAt, DataType, BeforeCreate, AutoIncrement, PrimaryKey} from "sequelize-typescript";
import { PermissionType } from "../../utils/enums";
import User from "../models/user";

@Table({tableName: "permission"})
export default class Permission extends Model<Permission> {
  @Column({allowNull: false, defaultValue: PermissionType.Gold, validate: {notEmpty: true}})
  code: PermissionType;

  @Column({allowNull: true, validate: {notEmpty: true}})
  description: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => User, { 
    foreignKey: "permissionId"
  })
  users: User[];
}
