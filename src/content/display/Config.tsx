//-Path: "uno-tool/src/content/display/Config.tsx"
import {useAtom} from "jotai";
import {useTheme} from "@mui/material";
import {useEffect} from "react";
import PlayersAtom from "../../context/Players";
import DisplayAtom, {PlayerType} from "../../context/Display";

export default function Config() {
	const Theme = useTheme();
	const [players] = useAtom(PlayersAtom);
	const [display, setDisplay] = useAtom(DisplayAtom);

	const Render = (block?: boolean) => {
		if (display.turn !== undefined) {
			const player: PlayerType = [
				[
					players[Next(true)],
					block
						? Theme.palette.error.main
						: Theme.palette.text.disabled,
				],
				[players[display.turn], Theme.palette.text.primary],
				[players[Next()], Theme.palette.warning.main],
			];
			setDisplay((prev) => ({...prev, player}));
		}
	};

	const Next = (before?: boolean) => {
		const max = players.length;
		let next =
			(display.turn ?? 0) + (display.retrun ? -1 : 1) * (before ? -1 : 1);

		if (max === next) {
			next = before ? max - 1 : 0;
		}
		if (next === -1) {
			next = max - 1;
		}
		return next;
	};

	const nextTurn = () => {
		// console.log(players, display);
		if (display.turn !== undefined) {
			setDisplay((prev) => ({...prev, turn: Next()}));
			Render();
		}
	};

	const Reverse = () => {
		setDisplay((prev) => ({...prev, retrun: !prev.retrun}));
		nextTurn();
	};

	const Block = () => {
		nextTurn();
		setTimeout(() => {
			nextTurn();
			Render(true);
		}, 1000);
	};

	useEffect(() => {
		if (display.turn === undefined) {
			setDisplay((prev) => ({...prev, turn: 0}));
		} else if (!display.player) {
			Render();
		}
		console.log("====================================");
		console.log(display.player?.[0], display.player?.[1]);
		console.log("====================================");
	}, [display]);

	return {nextTurn, Reverse, Block};
}
