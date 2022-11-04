import { Model } from "sequelize";
import { PermissionType } from "../../utils/enums";

export interface PermissionAttributes {
  id: number;
  code: PermissionType;
  description: string;
}

module.exports = (sequelize, DataTypes) => {
  class Permission
    extends Model<PermissionAttributes>
    implements PermissionAttributes
  {
    id: number;
    code: PermissionType;
    description: string;

    static associate(models) {
      Permission.hasMany(models.User, {
        foreignKey: "permissionId",
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.ENUM,
        values: Object.values(PermissionType),
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
