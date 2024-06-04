//-Path: "uno-tool/src/context/Display.ts"
import {atomWithStorage} from "jotai/utils";

export type DisplayType = {
	block: boolean;
	retrun: boolean;
	player: string[];
};

const DisplayAtom = atomWithStorage<DisplayType>("display", {
	block: false,
	retrun: false,
	player: [],
});

export default DisplayAtom;
