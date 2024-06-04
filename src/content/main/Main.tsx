//-Path: "uno-tool/src/content/main/Main.tsx"
import Player from "./Player";
import {useAtom} from "jotai";
import {useState} from "react";
import Setting from "./Setting";
import {Link} from "react-router-dom";
import DisplayAtom from "../../context/Display";
import {Box, Button, Paper, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

export default function Main() {
	const [content, setContent] = useState("player");
	const [display, setDisplay] = useAtom(DisplayAtom);

	const Contents: [string, React.ReactNode][] = [
		["player", <Player />],
		["setting", <Setting />],
	];

	return (
		<Paper
			elevation={16}
			sx={{p: 4, gap: 2, display: "flex", flexDirection: "column"}}>
			<TabContext value={content}>
				<Box sx={{borderBottom: 1, borderColor: "divider"}}>
					<TabList onChange={(_, value) => setContent(value)}>
						{Contents.map((contents, index) => (
							<Tab
								key={index}
								label={contents[0]}
								value={contents[0]}
							/>
						))}
					</TabList>
				</Box>
				{Contents.map((contents, index) => (
					<TabPanel key={index} value={contents[0]} sx={{p: 0}}>
						<Paper
							variant='outlined'
							sx={{
								p: 2,
								gap: 2,
								display: "flex",
								flexDirection: "column",
							}}>
							{contents[1]}
						</Paper>
					</TabPanel>
				))}
			</TabContext>
			<Link to='/display'>
				<Button variant='contained' fullWidth>
					start
				</Button>
			</Link>
		</Paper>
	);
}
