//-Path: "uno-tool/src/context/Display.ts"
import { atomWithStorage } from 'jotai/utils';

export type ActionType = 'normal' | 'blocked' | 'reversed' | 'won' | 'uno';

export type PlayerDisplay = {
    name: string;
    color: string;
    size: string;
    index: number;
    isUno?: boolean;
};

export type TurnHistory = {
    player: string;
    action: ActionType;
    timestamp: number;
};

export type DisplayType = {
    turn?: number;
    retrun: boolean;
    lastAction?: ActionType;
    history: TurnHistory[];
    players?: PlayerDisplay[];
    unoPlayers: string[];
    winners: { name: string; rank: number }[];
};

const DisplayAtom = atomWithStorage<DisplayType>('display', {
    history: [],
    retrun: false,
    unoPlayers: [],
    winners: [],
});

export default DisplayAtom;
