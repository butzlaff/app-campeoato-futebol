import { IPoints } from '../Interfaces/points/IPoints';
import { IMatchPoints } from '../Interfaces/matches/IMatchPoints';

class TeamPointsCalculator {
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;

  constructor(
    private homeOrAway: 'homeTeam' | 'awayTeam' | 'both',
    private teamName: string,
    private matches: IMatchPoints[],
  ) {}

  calculatePoints(): IPoints {
    this.matches
      .filter((match) => this.isTeamInMatch(match))
      .forEach((match) => {
        this.totalGames += 1;

        if (!match.inProgress) {
          this.updateStatsFromMatch(match);
        }
      });
    return {
      name: this.teamName,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
    };
  }

  private isTeamInMatch(match: IMatchPoints): boolean {
    if (this.homeOrAway === 'both') {
      return (
        match.awayTeam.teamName === this.teamName
        || match.homeTeam.teamName === this.teamName
      );
    }
    return (
      match[this.homeOrAway].teamName === this.teamName
    );
  }

  private updateStatsFromMatch(match: IMatchPoints): void {
    const matchPoints = this.calculateMatchPoints(match);
    this.totalPoints += matchPoints;

    if (matchPoints === 3) {
      this.totalVictories += 1;
    } else if (matchPoints === 1) {
      this.totalDraws += 1;
    } else {
      this.totalLosses += 1;
    }

    const isHomeTeam = match.homeTeam.teamName === this.teamName;
    const goalsFavor = isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
    const goalsOwn = isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
  }

  private calculateMatchPoints(match: IMatchPoints): number {
    const isHomeTeam = match.homeTeam.teamName === this.teamName;
    const isAwayTeam = match.awayTeam.teamName === this.teamName;

    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }

    if (isHomeTeam && match.homeTeamGoals > match.awayTeamGoals) {
      return 3;
    }

    if (isAwayTeam && match.awayTeamGoals > match.homeTeamGoals) {
      return 3;
    }

    return 0;
  }
}
export default TeamPointsCalculator;
