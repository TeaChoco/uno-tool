//-Path: "uno-tool/src/content/display/Config.tsx"
import {useAtom} from "jotai";
import {useEffect} from "react";
import PlayersAtom from "../../context/Players";
import DisplayAtom, {PlayerType} from "../../context/Display";

export default function Config() {
	const [players] = useAtom(PlayersAtom);
	const [display, setDisplay] = useAtom(DisplayAtom);

	const Render = () => {
		const record = display.record;
		const player: PlayerType = [
			players?.[record[record.length - 2]] ?? "null",
			players?.[record[record.length - 1]] ?? "null",
			players?.[Next()] ?? "null",
		];
		setDisplay((prev) => ({...prev, player}));
	};

	const Next = () => {
		const reverse = display.reverse;
		const record = display.record;
		const count = reverse ? -1 : 1;
		const turn = record[record.length - 1] ?? 0;
		const max = players.length;
		let next = turn + count;
		console.log(next);
		if (next >= max) {
			next = reverse ? max - 1 : 0;
		}
		if (next < 0) {
			next = max - 1;
		}
		return next;
	};

	const nextTurn = (before?: boolean) => {
		const record = display.record;
		const next = before ? record[record.length - 2] : Next();
		setDisplay((prev) => ({
			...prev,
			block: false,
			record: [...prev.record, next],
			reverse: before ? !prev.reverse : prev.reverse,
		}));
		Render();
	};

	const Reverse = () => {
		nextTurn(true);
	};

	const Block = () => {
		nextTurn();
		// setDisplay((prev) => ({...prev, block: true}));
		Render();
	};

	useEffect(() => {
		if (!display.player) {
			Render();
		}
		// console.log(display);
	}, [display]);

	return {nextTurn, Reverse, Block};
}
