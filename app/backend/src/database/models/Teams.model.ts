import { DataTypes, InferAttributes, Model } from 'sequelize';
import database from './index';
import ITeams from './interfaces/ITeams.model';

class TeamsModel extends Model<InferAttributes<TeamsModel>> implements ITeams {
  declare id:number;
  declare teamName:string;
}

TeamsModel.init({
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

export default TeamsModel;
