//-Path: "uno-tool/src/content/display/Config.tsx"
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import PlayersAtom from '../../context/Players';
import DisplayAtom, { ActionType, PlayerDisplay, TurnHistory } from '../../context/Display';

export default function Config() {
    const theme = useTheme();
    const [players, setPlayers] = useAtom(PlayersAtom);
    const [display, setDisplay] = useAtom(DisplayAtom);

    const colors = {
        normal: theme.palette.text.primary,
        blocked: theme.palette.error.main,
        reversed: theme.palette.warning.main,
        next: theme.palette.info.main,
        previous: theme.palette.text.disabled,
        won: theme.palette.success.main,
        uno: '#d62828', // UNO Red
    };

    const addHistory = (playerName: string, action: ActionType) => {
        const newEntry: TurnHistory = {
            player: playerName,
            action,
            timestamp: Date.now(),
        };
        setDisplay((prev) => ({
            ...prev,
            history: [...(prev.history ?? []), newEntry],
        }));
    };

    const clearHistory = () => {
        setDisplay((prev) => ({ ...prev, history: [] }));
    };

    const getPlayerIndex = (offset: number): number => {
        const max = players.length;
        if (max === 0) return 0;
        const direction = display.retrun ? -1 : 1;
        let index = ((display.turn ?? 0) + offset * direction) % max;
        if (index < 0) index += max;
        return index;
    };

    const Render = (action: ActionType = 'normal') => {
        if (display.turn === undefined || players.length === 0) return;

        const historyArr = display.history ?? [];
        const recentHistory = historyArr.slice(-2);

        const prevPlayers: PlayerDisplay[] = recentHistory.map((h, i) => ({
            name: h.player,
            color:
                h.action === 'blocked'
                    ? colors.blocked
                    : h.action === 'reversed'
                      ? colors.reversed
                      : h.action === 'uno'
                        ? colors.uno
                        : colors.previous,
            size: i === 0 ? '4vw' : '5vw',
            index: players.indexOf(h.player),
        }));

        while (prevPlayers.length < 2) {
            prevPlayers.unshift({
                name: '-',
                color: colors.previous,
                size: '4vw',
                index: -1,
            });
        }

        const currentPlayer: PlayerDisplay = {
            name: players[display.turn],
            color: action === 'blocked' ? colors.blocked : colors.normal,
            size: '10vw',
            index: display.turn,
            isUno: display.unoPlayers?.includes(players[display.turn]),
        };

        const nextPlayers: PlayerDisplay[] = [
            {
                name: players[getPlayerIndex(1)],
                color: colors.next,
                size: '5vw',
                index: getPlayerIndex(1),
            },
            {
                name: players[getPlayerIndex(2)],
                color: colors.next,
                size: '4vw',
                index: getPlayerIndex(2),
            },
        ];

        const displayPlayers = [...prevPlayers, currentPlayer, ...nextPlayers];
        setDisplay((prev) => ({ ...prev, players: displayPlayers, lastAction: action }));
    };

    const nextTurn = () => {
        if (display.turn !== undefined && players.length > 0) {
            const currentPlayer = players[display.turn];
            if (currentPlayer) {
                addHistory(currentPlayer, 'normal');
                if (display.unoPlayers?.includes(currentPlayer)) {
                    setDisplay((prev) => ({
                        ...prev,
                        unoPlayers: prev.unoPlayers.filter((p) => p !== currentPlayer),
                    }));
                }
            }

            const nextIndex = getPlayerIndex(1);
            setDisplay((prev) => ({ ...prev, turn: nextIndex }));
        }
    };

    const Reverse = () => {
        if (display.turn !== undefined && players.length > 0) {
            const currentPlayer = players[display.turn];
            if (currentPlayer) addHistory(currentPlayer, 'reversed');

            setDisplay((prev) => ({ ...prev, retrun: !prev.retrun }));
            const nextIndex = getPlayerIndex(1);
            setDisplay((prev) => ({ ...prev, turn: nextIndex }));
        }
    };

    const Block = () => {
        if (display.turn !== undefined && players.length > 0) {
            const currentPlayer = players[display.turn];
            if (currentPlayer) addHistory(currentPlayer, 'normal');

            const nextIndex = getPlayerIndex(1);
            setDisplay((prev) => ({ ...prev, turn: nextIndex }));

            setTimeout(() => {
                const blockedPlayer = players[nextIndex];
                if (blockedPlayer) addHistory(blockedPlayer, 'blocked');

                const skipIndex = getPlayerIndex(2);
                setDisplay((prev) => ({ ...prev, turn: skipIndex }));
            }, 500);
        }
    };

    const Uno = () => {
        if (display.turn !== undefined && players.length > 0) {
            const currentPlayerIndex = display.turn;
            const currentPlayer = players[currentPlayerIndex];

            if (display.unoPlayers?.includes(currentPlayer)) {
                // WIN Logic
                if (currentPlayer) addHistory(currentPlayer, 'won');

                const currentRank = (display.winners?.length || 0) + 1;
                const newWinners = [
                    ...(display.winners || []),
                    { name: currentPlayer, rank: currentRank },
                ];

                const nextOldIndex = getPlayerIndex(1);
                const newPlayers = players.filter((_, i) => i !== currentPlayerIndex);

                // Check if game over (only 1 player left)
                if (newPlayers.length === 1) {
                    const lastPlayer = newPlayers[0];
                    newWinners.push({ name: lastPlayer, rank: currentRank + 1 });

                    setDisplay((prev) => ({
                        ...prev,
                        unoPlayers: [],
                        players: [], // Clear active players
                        winners: newWinners,
                        turn: undefined, // End game
                    }));
                    setPlayers([]); // Clear global players list or keep them? Usually clear active game.
                    // Actually, let's keep setPlayers([]) as per original logic which seemed to remove them from game.
                    // But wait, if we remove them, we lose the record if we rely on 'players' atom.
                    // The original code did `setPlayers(newPlayers)`.
                    // So we should continue doing that until 0 or 1.

                    // Final state: 0 players left in game, all in winners.
                    setPlayers([]);
                    return;
                }

                // Remove from Uno list
                setDisplay((prev) => ({
                    ...prev,
                    winners: newWinners,
                    unoPlayers: prev.unoPlayers.filter((p) => p !== currentPlayer),
                }));

                setPlayers(newPlayers);

                let newTurn = nextOldIndex;
                if (nextOldIndex > currentPlayerIndex) {
                    newTurn = nextOldIndex - 1;
                }

                newTurn = newTurn % newPlayers.length;
                setDisplay((prev) => ({ ...prev, turn: newTurn }));
            } else {
                // Call UNO Logic
                if (currentPlayer) addHistory(currentPlayer, 'uno');

                const nextIndex = getPlayerIndex(1);
                setDisplay((prev) => ({
                    ...prev,
                    unoPlayers: [...(prev.unoPlayers ?? []), currentPlayer],
                    turn: nextIndex,
                }));
            }
        }
    };

    const Restart = () => {
        if (display.winners?.length > 0) {
            // Sort by rank to determine order
            const sortedWinners = [...display.winners].sort((a, b) => a.rank - b.rank);
            const newPlayers = sortedWinners.map((w) => w.name);

            // Reset game state but keep history? Usually restart clears history or keeps it.
            // Let's assume clear history for new round.
            setDisplay((prev) => ({
                ...prev,
                history: [],
                winners: [],
                unoPlayers: [],
                turn: undefined, // Let useEffect handle start
                active: true, // Add explicit active flag if needed, but turn=undefined + players>=2 triggers start
            }));

            setPlayers(newPlayers);
        }
    };

    useEffect(() => {
        if (display.turn === undefined && players.length >= 2)
            setDisplay((prev) => ({ ...prev, turn: 0 }));
        else if (players.length < 2 && display.winners.length === 0) {
            // If manual removal leads to < 2 and no winners (not end game), maybe reset or pause?
            // For now, just ensure we don't start.
            // But if we are mid-game and someone leaves?
            // The prompt says "Start playing impossible if < 2".
            if (display.turn !== undefined) setDisplay((prev) => ({ ...prev, turn: undefined }));
        } else Render(display.lastAction);
    }, [
        display.turn,
        display.retrun,
        display.history,
        players,
        display.unoPlayers,
        display.winners,
    ]);

    return { nextTurn, Reverse, Block, clearHistory, Uno, Restart };
}
