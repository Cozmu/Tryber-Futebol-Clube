import { DataTypes, InferAttributes, Model } from 'sequelize';
import database from './index';

class Teams extends Model<InferAttributes<Teams>> {
  declare id:number;
  declare teamName:string;
}

Teams.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: database,
  timestamps: false,
  tableName: 'teams',
  underscored: true,
});

export default Teams;
