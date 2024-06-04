//-Path: "uno-tool/src/components/Arrow.tsx"
import ArrowSvg from "../custom/Arrow";
import {Box, useTheme} from "@mui/material";

export default function Arrow() {
	const Theme = useTheme();

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
				color={Theme.palette.text.primary}
				sx={{
					color: "red",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: {xs: "90vw", md: "50vw"},
					height: {xs: "90vw", md: "50vw"},
					animation: `spinR 10s linear infinite`,
				}}
			/>
		</Box>
	);
}
