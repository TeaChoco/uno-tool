//-Path: "uno-tool/src/components/Arrow.tsx"
import {useAtom} from "jotai";
import ArrowSvg from "../custom/Arrow";
import {Box, useTheme} from "@mui/material";
import DisplayAtom from "../context/Display";

export default function Arrow() {
	const Theme = useTheme();
	const [display] = useAtom(DisplayAtom);

	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<ArrowSvg
				color={Theme.palette.text.secondary}
				sx={{
					color: "red",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: {xs: "90vw", md: "50vw"},
					height: {xs: "90vw", md: "50vw"},
					animation: `spin${
						display.reverse ? "R" : "L"
					} 10s linear infinite`,
				}}
			/>
		</Box>
	);
}
