// import sequelize = require('sequelize');

const totalVictories = 'COUNT(CASE WHEN home_team_goals > away_team_goals THEN 1 END)';
const totalDraws = 'COUNT(CASE WHEN home_team_goals = away_team_goals THEN 1 END)';
const totalLosses = 'COUNT(CASE WHEN home_team_goals < away_team_goals THEN 1 END)';
const goalsBalance = 'SUM(`home_team_goals`) - SUM(`away_team_goals`)';
const totalPoints = `${totalVictories} * 3 + ${totalDraws}`;

const totalGamesSubquery = `(
  SELECT COUNT(*)
  FROM matches AS m
  WHERE m.home_team_id = MatchesModel.home_team_id
    AND m.in_progress = false
)`;

export {
  totalDraws,
  totalLosses,
  totalVictories,
  goalsBalance,
  totalPoints,
  totalGamesSubquery,
};
