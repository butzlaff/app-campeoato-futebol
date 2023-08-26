// homeTeam_id: 16,
// home_teamGoals: 1,
// away_team_id: 8,
// away_team_goals: 1,
// in_progress: false,

export default interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
