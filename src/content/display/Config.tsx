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

	const Before = () => {
		const reverse = display.return;
		const record = display.record;
		const turn = record[record.length - 1] ?? 0;
		const max = players.length;
		let next = turn + (reverse ? -1 : 1);
		if (max === next) {
			next = reverse ? max - 1 : 0;
		}
		if (next === -1) {
			next = max - 1;
		}
		return next;
	};

	const Next = (count: number = 1) => {
		const reverse = display.return;
		const record = display.record;
		const turn = record[record.length - 1] ?? 0;
		const max = players.length;
		let next = turn + (reverse ? -1 : 1);
		if (max === next) {
			next = reverse ? max - 1 : 0;
		}
		if (next === -1) {
			next = max - 1;
		}
		return next;
	};

	const nextTurn = (count: number = 1) => {
		const next = Next(count);
		setDisplay((prev) => ({
			...prev,
			block: false,
			record: [...prev.record, next],
		}));
		Render();
	};

	const Reverse = () => {
		setDisplay((prev) => ({...prev, return: !prev.return}));
		nextTurn();
	};

	const Block = () => {
		nextTurn(2);
		// setDisplay((prev) => ({...prev, block: true}));
		Render();
	};

	useEffect(() => {
		if (!display.player) {
			Render();
		}
		console.log(display);
	}, [display]);

	return {nextTurn, Reverse, Block};
}
