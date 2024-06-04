//-Path: "uno-tool/src/content/main/Setting.tsx"
import {useAtom} from "jotai";
import SettingAtom from "../../context/Setting";
import {FormControlLabel, Switch} from "@mui/material";

export default function Setting() {
	const [setting, setSetting] = useAtom(SettingAtom);

	return (
		<>
			<FormControlLabel
				label='dark mode'
				control={<Switch />}
				checked={setting.darkmode}
				onChange={(_, checked) =>
					setSetting((prev) => ({...prev, darkmode: checked}))
				}
			/>
		</>
	);
}
