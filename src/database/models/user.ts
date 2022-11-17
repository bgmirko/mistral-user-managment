import {
  Table,
  Column,
  Model,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import Permission from "./permession";
import { Length, IsEmail, IsNotEmpty } from "class-validator";

@Table({ tableName: "user" })
export default class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER })
  permissionId: number;

  @Length(3, 15)
  @Column({ allowNull: false, validate: { notEmpty: true } })
  firstName: string;

  @Length(3, 15)
  @Column({ allowNull: false, validate: { notEmpty: true } })
  lastName: string;

  @Length(3, 10)
  @Column({ allowNull: false, validate: { notEmpty: true } })
  username: string;

  @IsEmail()
  @Column({
    allowNull: false,
    unique: true,
    validate: { notEmpty: true, isEmail: true },
  })
  email: string;

  @Column({ allowNull: false, validate: { notEmpty: true } })
  password: string;

  @Column({ defaultValue: true })
  status: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;

  @BelongsTo(() => Permission, "permissionId")
  permission: Permission;
}
