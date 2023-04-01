import { DataTypes, InferAttributes, Model } from 'sequelize';
import database from './index';
import IMatcher from './interfaces/IMatcher.model';
import TeamsModel from './Teams.model';

class MatcherModel extends Model<InferAttributes<MatcherModel>> implements IMatcher {
  declare id:number;
  declare homeTeamId:number;
  declare homeTeamGoals:number;
  declare awayTeamId:number;
  declare awayTeamGoals:number;
  declare inProgress:number;
}

MatcherModel.init({
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'in_progress',
  },
}, {
  sequelize: database,
  timestamps: false,
  tableName: 'matches',
  underscored: true,
});

MatcherModel.belongsTo(TeamsModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatcherModel.belongsTo(TeamsModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default MatcherModel;
