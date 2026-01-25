import { TablerIcon } from '@tabler/icons-react';

export interface Game {
  id?: number;
  created_at: string;
  winner: string | null;
  breaker: string | null;
  stripesPlayer: string | null;
  solidsPlayer: string | null;
  loserBallsRemaining: number | null;
  blackBallDeciderGame: boolean | null;
  winByBlackFault: boolean | null;
}

export interface TriggerProps {
  children: React.ReactNode;
  danger?: boolean;
  onClick: () => void;
}

export interface StatsProps {
  games: Game[];
  totalGames: number;
}

export interface MatchSummaryProps {
  p1Wins: number;
  p2Wins: number;
}

export interface PlayerSummaryProps {
  name: string;
  avatar: string;
  leader: boolean;
}

export interface ScoreProps {
  value: number;
  leader: boolean;
}

export interface ScoreSummaryProps {
  p1Score: number;
  p2Score: number;
}

export interface LegendProps {
  children: React.ReactNode;
}

export interface ComparisonProps {
  p1Value: number;
  p2Value: number;
  p1Total: number;
  p2Total: number;
  plainValue?: boolean;
  compareValues?: boolean;
  smallerIsBetter?: boolean;
  decimal?: number;
  children: string;
}

export interface BarProps {
  value: number;
  isLeader: boolean;
  rotate?: boolean;
}

//

export interface ToggleProps {
  label: string;
  value: boolean;
  onSetValue: (boolean) => void;
}

export interface DeciderProps {
  label: string;
  icon?: TablerIcon;
  value: string | null;
  onSetValue: (string) => void;
}

export interface PickerProps {
  label: string;
  icon?: TablerIcon;
  value: number;
  onSetValue: (number) => void;
}

export interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (game: Game) => void;
}
