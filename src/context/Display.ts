//-Path: "uno-tool/src/context/Display.ts"
import { atomWithStorage } from 'jotai/utils';

export type ActionType = 'normal' | 'blocked' | 'reversed';

export type PlayerDisplay = {
    name: string;
    color: string;
    size: string;
    index: number;
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
};

const DisplayAtom = atomWithStorage<DisplayType>('display', {
    history: [],
    retrun: false,
});

export default DisplayAtom;
