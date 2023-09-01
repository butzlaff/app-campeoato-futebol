import { IPoints } from '../Interfaces/points/IPoints';
import TeamPointsCalculator from './TeamPointsCalculator';

class EnhancedTeamPointsCalculator extends TeamPointsCalculator {
  calculatePoints(): IEnhancedPoints {
    const basePoints = super.calculatePoints();

    const goalsBalance = basePoints.goalsFavor - basePoints.goalsOwn;
    const efficiency = basePoints.totalGames > 0
      ? ((basePoints.totalPoints / (basePoints.totalGames * 3)) * 100).toFixed(2)
      : '0.00';

    return {
      ...basePoints,
      goalsBalance,
      efficiency,
    };
  }
}

interface IEnhancedPoints extends IPoints {
  goalsBalance: number;
  efficiency: string;
}

export default EnhancedTeamPointsCalculator;
