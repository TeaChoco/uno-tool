//-Path: "uno-tool/src/content/Setting.tsx"
import {Button, Paper} from "@mui/material";
import {Link} from "react-router-dom";

export default function Setting() {
	return (
		<Paper elevation={16} sx={{p: 4}}>
			<Link to='/display'>
				<Button variant='contained'>start</Button>
			</Link>
		</Paper>
	);
}
