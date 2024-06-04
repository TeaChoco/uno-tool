//-Path: "uno-tool/src/context/Setting.ts"

import {atomWithStorage} from "jotai/utils";

type SettingType = {
	darkmode: boolean;
};

const SettingAtom = atomWithStorage<SettingType>("setting", {
	darkmode: true,
});

export default SettingAtom;
