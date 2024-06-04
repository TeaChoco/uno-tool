//-Path: "uno-tool/src/theme/Theme.tsx"
import {useAtom} from "jotai";
import {createTheme} from "@mui/material";
import SettingAtom from "../context/Setting";

export default function Theme() {
	const [setting] = useAtom(SettingAtom);

	return createTheme({palette: {mode: setting.darkmode ? "dark" : "light"}});
}
