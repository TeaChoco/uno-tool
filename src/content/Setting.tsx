//-Path: "uno-tool/src/content/Setting.tsx"
import {Link} from "react-router-dom";
import {Button, Paper} from "@mui/material";

export default function Setting() {
	return (
		<Paper elevation={16} sx={{p: 4}}>
			<Link to='/display'>
				<Button variant='contained'>start</Button>
			</Link>
		</Paper>
	);
}
