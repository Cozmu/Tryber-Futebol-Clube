import { DataTypes, InferAttributes, Model } from 'sequelize';
import database from './index';

class UsersModel extends Model<InferAttributes<UsersModel>> {
  declare id:number;
  declare username:string;
  declare role:string;
  declare email:string;
  declare password:string;
}

UsersModel.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: database,
  tableName: 'users',
  timestamps: false,
});

export default UsersModel;
