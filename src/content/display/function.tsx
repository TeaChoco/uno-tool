//-Path: "uno-tool/src/content/display/function.tsx"
import {useAtom} from "jotai";
import DisplayAtom, {DisplayType} from "../../context/Display";
import PlayersAtom from "../../context/Players";
import {useState} from "react";

function nextPlayer(players: string[], currentPlayerIndex: number): number {
	return (currentPlayerIndex + 1) % players.length;
}

function getDisplayInfo(
	players: string[],
	currentPlayerIndex: number,
	block: boolean,
	returnFlag: boolean
): DisplayType {
	const previousPlayerIndex =
		currentPlayerIndex === 0 ? players.length - 1 : currentPlayerIndex - 1;
	const nextPlayerIndex = nextPlayer(players, currentPlayerIndex);

	return {
		turn: currentPlayerIndex + 1,
		block: block,
		return: returnFlag,
		player: [
			players[previousPlayerIndex],
			players[currentPlayerIndex],
			players[nextPlayerIndex],
		],
	};
}

export const Render = () => {
	const [players] = useAtom(PlayersAtom);
	const [display, update] = useAtom(DisplayAtom);
	const [block, setBlock] = useState(false);
	const [returnFlag, setReturnFlag] = useState(false);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

	// ฟังก์ชันสำหรับเล่นไพ่
	const playCard = () => {
		// อัปเดตสถานะเกม
		const updatedDisplayInfo = getDisplayInfo(
			players,
			currentPlayerIndex,
			block,
			returnFlag
		);
		update((display) => ({...display, ...updatedDisplayInfo}));

		// เปลี่ยนผู้เล่นถัดไป
		setCurrentPlayerIndex(nextPlayer(players, currentPlayerIndex));

		// รีเซ็ตค่า block และ returnFlag
		setBlock(false);
		setReturnFlag(false);
	};

	// ฟังก์ชันสำหรับบล็อก
	const blockPlayer = () => {
		setBlock(true);
	};

	// ฟังก์ชันสำหรับส่งกลับ
	const returnCard = () => {
		setReturnFlag(true);
	};

	return (
		<div>
			{/* แสดงผู้เล่นทั้งหมด */}
			<ul>
				{players.map((player, index) => (
					<li key={index}>{player}</li>
				))}
			</ul>

			{/* แสดงข้อมูลการแสดงผล */}
			<div>
				<p>ถึงตาผู้เล่นที่: {display.turn}</p>
				{display.player && (
					<>
						<p>ผู้เล่นคนก่อน: {display.player[0]}</p>
						<p>ผู้เล่นปัจจุบัน: {display.player[1]}</p>
						<p>ผู้เล่นถัดไป: {display.player[2]}</p>
					</>
				)}
				{display.block && <p>ถูกบล็อก</p>}
				{display.return && <p>ส่งกลับ</p>}
			</div>

			{/* ปุ่มสำหรับเล่นไพ่ */}
			<button onClick={playCard}>เล่นไพ่</button>

			{/* ปุ่มสำหรับบล็อก */}
			<button onClick={blockPlayer}>บล็อก</button>

			{/* ปุ่มสำหรับส่งกลับ */}
			<button onClick={returnCard}>ส่งกลับ</button>
		</div>
	);
};
