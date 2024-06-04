//-Path: "uno-tool/src/theme/Color.tsx"
import {useTheme} from "@mui/material";

export type ColorType = {
	red: string;
	blue: string;
	green: string;
	yellow: string;
};
export type ColorKey = keyof ColorType;

export default function Color() {
	const Theme = useTheme();
	const color: ColorType = {
		red: Theme.palette.error.main,
		blue: Theme.palette.info.main,
		green: Theme.palette.success.main,
		yellow: Theme.palette.warning.main,
	};
	return color;
}
