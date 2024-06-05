//-Path: "uno-tool/src/content/display/Display.tsx"
import {
	Box,
	Theme,
	SxProps,
	useTheme,
	Typography,
	IconButton,
} from "@mui/material";
import Config from "./Config";
import {useAtom} from "jotai";
import {RESET} from "jotai/utils";
import Icon from "../../custom/Icon";
import {Link} from "react-router-dom";
import Arrow from "../../components/Arrow";
import DisplayAtom from "../../context/Display";

const SxCard = (
	position: [string, string],
	translate: string
): SxProps<Theme> => ({
	position: "absolute",
	[position[0]]: {xs: "10vw", sm: "50%"},
	[position[1]]: {xs: "50%", sm: "10vw"},
	transform: {
		sm: `translate(${translate}50%, ${translate}50%)`,
		xs: `translate(${translate}50%, 0) rotate(90deg)`,
	},
	height: {xs: "50vw", sm: "30vw", md: "20vw"},
	borderRadius: {xs: "3.5vw", sm: "2vw", md: "1.5vw"},
});

export default function Display() {
	const Theme = useTheme();
	const [display, setDisplay] = useAtom(DisplayAtom);
	const {nextTurn, Reverse, Block} = Config();

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
					onClick={() => nextTurn()}
					sx={{position: "absolute", width: "100vw", height: "100vh"}}
				/>
				<Box sx={{top: 10, left: 10, position: "absolute"}}>
					<Link to='/'>
						<IconButton>
							<Icon.I icon={Icon.fa.faGear} />
						</IconButton>
					</Link>
					<IconButton onClick={() => setDisplay(RESET)}>
						<Icon.I icon={Icon.fa.faRotateLeft} />
					</IconButton>
				</Box>
				<Box
					component='img'
					onClick={Reverse}
					sx={SxCard(["top", "left"], "-")}
					src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ef95353-9f74-45ba-a400-5494417ca165/ddmcdr1-02bbf02c-d83d-4103-b617-fe2d929067ec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVlZjk1MzUzLTlmNzQtNDViYS1hNDAwLTU0OTQ0MTdjYTE2NVwvZGRtY2RyMS0wMmJiZjAyYy1kODNkLTQxMDMtYjYxNy1mZTJkOTI5MDY3ZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jmGpDboFt4-maSQAFOOnxoYNdSfPwaAkfppdBvOOA_A'
				/>
				<Box
					component='img'
					onClick={Block}
					sx={SxCard(["bottom", "right"], "")}
					src='https://i.pinimg.com/736x/56/2b/78/562b780edc15e726be4cb8944922ca0a.jpg'
				/>
				{display.player !== undefined && (
					<Box
						sx={{
							gap: 2,
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
						}}>
						<Typography
							fontSize={"6vw"}
							color={
								display.block
									? Theme.palette.error.main
									: Theme.palette.text.disabled
							}>
							{display.player?.[0]}
						</Typography>
						<Typography
							fontSize={"10vw"}
							color={Theme.palette.text.primary}>
							{display.player?.[1]}
						</Typography>
						<Typography
							fontSize={"6vw"}
							color={Theme.palette.warning.main}>
							{display.player?.[2]}
						</Typography>
					</Box>
				)}
			</Box>
		</>
	);
}
