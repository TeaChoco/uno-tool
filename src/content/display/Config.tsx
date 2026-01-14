//-Path: "uno-tool/src/content/display/Config.tsx"
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import PlayersAtom from '../../context/Players';
import DisplayAtom, { ActionType, PlayerDisplay, TurnHistory } from '../../context/Display';

export default function Config() {
    const theme = useTheme();
    const [players] = useAtom(PlayersAtom);
    const [display, setDisplay] = useAtom(DisplayAtom);

    const colors = {
        normal: theme.palette.text.primary,
        blocked: theme.palette.error.main,
        reversed: theme.palette.warning.main,
        next: theme.palette.info.main,
        previous: theme.palette.text.disabled,
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
                    : colors.previous,
            size: i === 0 ? '4vw' : '5vw',
        }));

        while (prevPlayers.length < 2) {
            prevPlayers.unshift({ name: '-', color: colors.previous, size: '4vw' });
        }

        const currentPlayer: PlayerDisplay = {
            name: players[display.turn],
            color: action === 'blocked' ? colors.blocked : colors.normal,
            size: '10vw',
        };

        const nextPlayers: PlayerDisplay[] = [
            {
                name: players[getPlayerIndex(1)],
                color: colors.next,
                size: '5vw',
            },
            {
                name: players[getPlayerIndex(2)],
                color: colors.next,
                size: '4vw',
            },
        ];

        const displayPlayers = [...prevPlayers, currentPlayer, ...nextPlayers];
        setDisplay((prev) => ({ ...prev, players: displayPlayers, lastAction: action }));
    };

    const nextTurn = () => {
        if (display.turn !== undefined && players.length > 0) {
            const currentPlayer = players[display.turn];
            if (currentPlayer) addHistory(currentPlayer, 'normal');

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

    useEffect(() => {
        if (display.turn === undefined && players.length > 0)
            setDisplay((prev) => ({ ...prev, turn: 0 }));
        else Render(display.lastAction);
    }, [display.turn, display.retrun, display.history, players]);

    return { nextTurn, Reverse, Block, clearHistory };
}
