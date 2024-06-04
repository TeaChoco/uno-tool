//-Path: "uno-tool/src/App.tsx"
import Page from "./Page";
import Theme from "./theme/Theme";
import Background from "./components/Background";
import {Box, ThemeProvider} from "@mui/material";

export default function App() {
	const theme = Theme();

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					zIndex: 10,
					width: "100vw",
					height: "100vh",
					display: "flex",
					position: "fixed",
					overflow: "hidden",
					alignItems: "center",
					justifyContent: "center",
					bgcolor: theme.palette.background.default,
				}}>
				<Background />
				<Page />
			</Box>
		</ThemeProvider>
	);
}
