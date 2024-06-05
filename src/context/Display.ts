//-Path: "uno-tool/src/context/Display.ts"
import {atomWithStorage} from "jotai/utils";

export type PlayerType = [string, string, string]; // รูปแบบข้อมูลผู้เล่น: [ผู้เล่นคนก่อน, ผู้เล่นปัจจุบัน, ผู้เล่นคนถัดไป]

export type DisplayType = {
	block: boolean;
	return: boolean;
	record: number[];
	player?: PlayerType;
};

const DisplayAtom = atomWithStorage<DisplayType>("display", {
	block: false,
	return: false,
	record: [0],
});

export default DisplayAtom;
