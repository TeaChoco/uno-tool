//-Path: "uno-tool/src/context/Display.ts"
import {atomWithStorage} from "jotai/utils";

type Player = [string, string];
export type PlayerType = [Player, Player, Player];

export type DisplayType = {
	turn?: number;
	retrun: boolean;
	player?: PlayerType;
};

const DisplayAtom = atomWithStorage<DisplayType>("display", {retrun: false});

export default DisplayAtom;
