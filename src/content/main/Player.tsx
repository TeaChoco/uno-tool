//-Path: "uno-tool/src/content/main/Player.tsx"
import {
	Paper,
	Theme,
	Button,
	SxProps,
	useTheme,
	TextField,
	IconButton,
	Typography,
} from "@mui/material";
import {useAtom} from "jotai";
import Icon from "../../custom/Icon";
import {Reorder} from "framer-motion";
import {useEffect, useState} from "react";
import PlayersAtom from "../../context/Players";

const sx: SxProps<Theme> = {
	p: 1,
	display: "flex",
	position: "relative",
	alignItems: "center",
	justifyContent: "center",
};

export default function Player() {
	const Theme = useTheme();
	const [value, setValue] = useState("");
	const [error, setError] = useState<boolean>(false);
	const [players, setPlayers] = useAtom(PlayersAtom);

	const newPlayer = () => {
		if (!error || value !== "") {
			setPlayers((prev) => [...prev, value]);
			setValue("");
		}
	};

	const deletePlayer = (index: number) => {
		setPlayers((prev) => {
			prev.splice(index, 1);
			return [...prev];
		});
	};

	useEffect(() => {
		const same = players.find((player) => player === value);
		setError(same ? true : false);
	}, [value]);

	return (
		<>
			{players.length <= 0 && <Typography sx={sx}>no players</Typography>}
			<Reorder.Group
				values={players}
				onReorder={setPlayers}
				style={{
					gap: 16,
					display: "flex",
					flexDirection: "column",
				}}>
				{players.map((player, index) => (
					<Reorder.Item key={player} value={player}>
						<Paper elevation={4} sx={sx}>
							<Typography
								color={Theme.palette.text.disabled}
								sx={{position: "absolute", left: 10}}>
								{index + 1}
							</Typography>
							{player}
							<IconButton
								size='small'
								color='error'
								onClick={() => deletePlayer(index)}
								sx={{position: "absolute", right: 5}}>
								<Icon.I icon={Icon.fa.faTrash} />
							</IconButton>
						</Paper>
					</Reorder.Item>
				))}
			</Reorder.Group>
			<TextField
				value={value}
				error={error}
				label='player name'
				placeholder='player name'
				onChange={(event) => setValue(event.target.value)}
			/>
			<Button
				fullWidth
				variant='contained'
				onClick={newPlayer}
				disabled={value === ""}
				color={error ? "error" : "success"}>
				add new
			</Button>
		</>
	);
}
