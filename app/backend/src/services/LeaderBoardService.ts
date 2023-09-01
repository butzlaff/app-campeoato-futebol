import EnhancedTeamPointsCalculator from '../utils/EnhancedTeamPoints';
import { IMatchPoints } from '../Interfaces/matches/IMatchPoints';
import { IPoints } from '../Interfaces/points/IPoints';
// import TeamPointsCalculator from '../utils/TeamPointsCalculator';
import TeamModel from '../model/TeamModel';
import { ServiceResponse } from '../Interfaces/Response';
import MatchModel from '../model/MatchModel';

interface IPointsSort extends IPoints {
  efficiency: string;
  goalsBalance: number;
}

const teamStatsArraySort = (arrayToSort: IPointsSort[]) => (
  arrayToSort.sort((a, b) => {
  // Compare by totalPoints
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints; // Sort in descending order of totalPoints
    }

    // If totalPoints are equal, compare by goalsBalance
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories; // Sort in descending order of goalsBalance
    }

    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance; // Sort in descending order of goalsBalance
    }

    // If goalsBalance are also equal, compare by efficiency
    return b.goalsFavor - a.goalsFavor;
  }) // Sort in descending order of efficiency
);

export default class Leaderboard {
  constructor(
    private matchModel: MatchModel = new MatchModel(),
    private teamModel: TeamModel = new TeamModel(),
  ) { }

  public async findAll(homeOrAway: 'homeTeam' | 'awayTeam'): Promise<ServiceResponse<IPoints[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAllFinished();
    const result = teams.map((team) => {
      const statsCalculator = new EnhancedTeamPointsCalculator(
        homeOrAway,
        team.teamName,
        matches as IMatchPoints[],
      );
      const points = statsCalculator.calculatePoints();
      return { ...points };
    });
    const resultByPoints = teamStatsArraySort(result);
    return { status: 'SUCCESSFUL', data: resultByPoints };
  }
}
