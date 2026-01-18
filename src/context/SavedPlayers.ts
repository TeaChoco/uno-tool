//-Path: "uno-tool/src/context/SavedPlayers.ts"
import { atomWithStorage } from 'jotai/utils';

const SavedPlayersAtom = atomWithStorage<string[]>('saved-players', []);

export default SavedPlayersAtom;
