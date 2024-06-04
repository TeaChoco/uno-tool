//-Path: "uno-tool/src/content/Display.tsx"
import {Box} from "@mui/material";
import Arrow from "../components/Arrow";

export default function Display() {
	return (
		<>
			<Arrow />
			<Box
				sx={{
					width: "100vw",
					height: "100vh",
					display: "flex",
					position: "fixed",
					overflow: "hidden",
					alignItems: "center",
					justifyContent: "center",
				}}>
				hello uno tool
			</Box>
		</>
	);
}
