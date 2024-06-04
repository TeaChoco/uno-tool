//-Path: "uno-tool/src/content/Display.tsx"
import {Box, IconButton, styled} from "@mui/material";
import Arrow from "../components/Arrow";
import Icon from "../custom/Icon";
import {Link} from "react-router-dom";

const LinkIcon = styled(Link)({
	top: 20,
	left: 20,
	position: "absolute",
});

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
				<LinkIcon to='/'>
					<IconButton>
						<Icon.I icon={Icon.fa.faArrowLeftLong} />
					</IconButton>
				</LinkIcon>
				hello uno tool
			</Box>
		</>
	);
}
