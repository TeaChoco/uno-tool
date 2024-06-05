//-Path: "uno-tool/src/components/Background.tsx"
import {useAtom} from "jotai";
import DisplayAtom from "../context/Display";
import Color, {ColorKey} from "../theme/Color";
import {Box, SxProps, Theme} from "@mui/material";

export default function Background() {
	const [display] = useAtom(DisplayAtom);

	return (
		<Box
			sx={{
				zIndex: -1,
				width: "100vw",
				height: "100vh",
				position: "fixed",
				animation: `spin${
					display.reverse ? "R" : "L"
				} 60s linear infinite`,
			}}>
			<BackgroundColor color='red' />
			<BackgroundColor top color='blue' />
			<BackgroundColor left color='green' />
			<BackgroundColor left top color='yellow' />
		</Box>
	);
}

export function BackgroundColor({
	sx,
	top,
	left,
	color,
}: {
	top?: boolean;
	left?: boolean;
	color: ColorKey;
	sx?: SxProps<Theme>;
}) {
	const far = 70;
	const colors = Color();

	return (
		<Box
			sx={{
				...sx,
				width: "100vw",
				height: "100vh",
				display: "flex",
				borderRadius: "40%",
				position: "absolute",
				bgcolor: colors[color],
				top: `${top ? "-" : ""}${far}%`,
				left: `${left ? "-" : ""}${far}%`,
				boxShadow: `${colors[color]} 0 0 ${far}px ${far * 2}px`,
			}}
		/>
	);
}
