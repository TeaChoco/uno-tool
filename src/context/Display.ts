//-Path: "uno-tool/src/context/Display.ts"
import {atomWithStorage} from "jotai/utils";

export type DisplayType = {
	turn?: number;
	block: boolean;
	retrun: boolean;
};

const DisplayAtom = atomWithStorage<DisplayType>("display", {
	block: false,
	retrun: false,
});

export default DisplayAtom;
