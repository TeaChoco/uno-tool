//-Path: "uno-tool/src/context/Setting.ts"
import { atomWithStorage } from 'jotai/utils';

export type SettingType = {
    language: string;
    darkmode: boolean;
};

const SettingAtom = atomWithStorage<SettingType>('setting', {
    language: 'th',
    darkmode: true,
});

export default SettingAtom;
