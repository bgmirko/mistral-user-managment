import { Model } from "sequelize";

export interface UserAttributes {
  uuid: string;
  permissionId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  status: boolean;
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    uuid: string;
    permissionId: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    status: boolean;

    static associate(models) {
      User.belongsTo(models.Permission, { foreignKey:"permissionId", as:"Permission" });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Permissions",
          key: "id",
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
