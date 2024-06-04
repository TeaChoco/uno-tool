//-Path: "uno-tool/src/context/Players.ts"
import {atomWithStorage} from "jotai/utils";

const PlayersAtom = atomWithStorage<string[]>("players", []);

export default PlayersAtom;
