import { Box, Paper, alpha, useTheme, Typography, Divider, Button } from '@mui/material';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Icon from '../../custom/Icon';
import Config from '../display/Config';
import { useTranslation } from 'react-i18next';
import DisplayAtom, { TurnHistory } from '../../context/Display';

function formatTimeAgo(timestamp: number, t: (key: string) => string): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return t('history.justNow');
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${t('history.minsAgo')}`;
    const hours = Math.floor(minutes / 60);
    return `${hours} ${t('history.hoursAgo')}`;
}

export default function History() {
    const theme = useTheme();
    const { t } = useTranslation();
    const [display] = useAtom(DisplayAtom);
    const { clearHistory } = Config();

    // selectedGameId: null = Current Game, string = Past Game ID
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

    const pastGames = display.pastGames || [];

    // Determine active data
    let activeHistory: TurnHistory[] = [];
    let activeWinners: { name: string; rank: number }[] = [];
    let isCurrentGame = false;

    if (selectedGameId === null) {
        activeHistory = display.history || [];
        activeWinners = display.winners || [];
        isCurrentGame = true;
    } else {
        const game = pastGames.find((g) => g.id === selectedGameId);
        if (game) {
            activeHistory = game.history;
            activeWinners = game.winners;
        }
    }

    return (
        <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden', gap: 2 }}>
            {/* Left Panel: Rounds List */}
            <Paper
                variant="outlined"
                sx={{
                    width: '30%',
                    minWidth: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 2,
                }}>
                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                        {t('history.rounds')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        overflowY: 'auto',
                        flex: 1,
                        p: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                    <Button
                        variant={selectedGameId === null ? 'contained' : 'text'}
                        color={selectedGameId === null ? 'primary' : 'inherit'}
                        onClick={() => setSelectedGameId(null)}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', px: 2, py: 1.5, borderRadius: 2 }}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                            <Icon.I icon={Icon.fa.faGamepad} />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                <Typography variant="body2" fontWeight={700}>
                                    Current Game
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    {activeHistory.length > 0
                                        ? formatTimeAgo(
                                              activeHistory[activeHistory.length - 1]?.timestamp ||
                                                  Date.now(),
                                              t,
                                          )
                                        : 'New'}
                                </Typography>
                            </Box>
                        </Box>
                    </Button>

                    <Divider />

                    {pastGames.map((game, index) => (
                        <Button
                            key={game.id}
                            variant={selectedGameId === game.id ? 'contained' : 'text'}
                            color={selectedGameId === game.id ? 'primary' : 'inherit'}
                            onClick={() => setSelectedGameId(game.id)}
                            fullWidth
                            sx={{ justifyContent: 'flex-start', px: 2, py: 1.5, borderRadius: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    width: '100%',
                                }}>
                                <Icon.I icon={Icon.fa.faHistory} />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}>
                                    <Typography variant="body2" fontWeight={700}>
                                        Round {index + 1}
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                        {formatTimeAgo(game.timestamp, t)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Button>
                    ))}
                </Box>
            </Paper>

            {/* Right Panel: Details */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    gap: 2,
                }}>
                {/* Top: Turn History */}
                <Paper
                    variant="outlined"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: 2,
                    }}>
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            {t('history.title')}
                        </Typography>
                        {isCurrentGame && activeHistory.length > 0 && (
                            <Button
                                size="small"
                                color="error"
                                onClick={clearHistory}
                                startIcon={<Icon.I icon={Icon.fa.faTrash} />}>
                                {t('history.clear')}
                            </Button>
                        )}
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                        {activeHistory.length === 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    color: 'text.disabled',
                                    opacity: 0.5,
                                }}>
                                <Icon.I
                                    icon={Icon.fa.faInbox}
                                    style={{ fontSize: 40, marginBottom: 8 }}
                                />
                                <Typography>{t('history.empty')}</Typography>
                            </Box>
                        ) : (
                            [...activeHistory].reverse().map((entry, index) => {
                                const actionColor =
                                    entry.action === 'blocked'
                                        ? theme.palette.error.main
                                        : entry.action === 'reversed'
                                          ? theme.palette.warning.main
                                          : entry.action === 'won'
                                            ? theme.palette.success.main
                                            : entry.action === 'uno'
                                              ? '#d62828'
                                              : theme.palette.primary.main;

                                return (
                                    <Paper
                                        key={index}
                                        elevation={0}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: alpha(actionColor, 0.05),
                                            borderLeft: `4px solid ${actionColor}`,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                            }}>
                                            <Typography
                                                variant="caption"
                                                sx={{ fontWeight: 700, color: actionColor }}>
                                                #{activeHistory.length - index}
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600}>
                                                {entry.player}
                                            </Typography>
                                            {entry.action !== 'normal' && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        px: 0.75,
                                                        py: 0.25,
                                                        borderRadius: 0.5,
                                                        bgcolor: actionColor,
                                                        color: '#fff',
                                                        fontWeight: 600,
                                                    }}>
                                                    {t(`history.actions.${entry.action}`)}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatTimeAgo(entry.timestamp, t)}
                                        </Typography>
                                    </Paper>
                                );
                            })
                        )}
                    </Box>
                </Paper>

                {/* Bottom: Game Over / Winners */}
                {activeWinners.length > 0 && (
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '35%',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            borderRadius: 2,
                        }}>
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                bgcolor: alpha(theme.palette.success.main, 0.05),
                            }}>
                            <Typography variant="subtitle1" fontWeight={700} color="success.main">
                                <Icon.I icon={Icon.fa.faTrophy} style={{ marginRight: 8 }} />
                                Game Results
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                p: 2,
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}>
                            {activeWinners.map((winner) => (
                                <Box
                                    key={winner.rank}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 1,
                                        borderRadius: 1.5,
                                        bgcolor:
                                            winner.rank === 1
                                                ? alpha(theme.palette.warning.main, 0.1)
                                                : 'transparent',
                                        border:
                                            winner.rank === 1
                                                ? `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
                                                : '1px solid transparent',
                                    }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: '50%',
                                                bgcolor:
                                                    winner.rank === 1
                                                        ? theme.palette.warning.main
                                                        : theme.palette.grey[300],
                                                color:
                                                    winner.rank === 1 ? '#fff' : 'text.secondary',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '0.9rem',
                                            }}>
                                            {winner.rank}
                                        </Box>
                                        <Typography variant="body2" fontWeight={600}>
                                            {winner.name}
                                        </Typography>
                                    </Box>
                                    {winner.rank === 1 && (
                                        <Icon.I
                                            icon={Icon.fa.faCrown}
                                            style={{ color: theme.palette.warning.main }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
