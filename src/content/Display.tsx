//-Path: "uno-tool/src/content/Display.tsx"
import {useAtom} from "jotai";
import {useEffect} from "react";
import Icon from "../custom/Icon";
import {Link} from "react-router-dom";
import Arrow from "../components/Arrow";
import DisplayAtom from "../context/Display";
import PlayersAtom from "../context/Players";
import {Box, IconButton, Typography, styled, useTheme} from "@mui/material";

const LinkIcon = styled(Link)({
	top: 10,
	left: 10,
	position: "absolute",
});

export default function Display() {
	const Theme = useTheme();
	const [players] = useAtom(PlayersAtom);
	const [display, setDisplay] = useAtom(DisplayAtom);

	const nextTurn = () => {
		console.log(display);
	};

	useEffect(() => {}, []);

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
				<Box
					onClick={nextTurn}
					sx={{width: "100vw", height: "100vh"}}
				/>
				<LinkIcon to='/'>
					<IconButton>
						<Icon.I icon={Icon.fa.faGear} />
					</IconButton>
				</LinkIcon>
				<Typography color={Theme.palette.text.primary}>
					{display.turn && players[display.turn]}
				</Typography>
			</Box>
		</>
	);
}
