//-Path: "uno-tool/src/content/display/Display.tsx"
import Config from './Config';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Icon from '../../custom/Icon';
import MainDialog from '../main/Main';
import { useTranslation } from 'react-i18next';
import Arrow from '../../components/Arrow';
import DisplayAtom from '../../context/Display';
import {
    Box,
    Fab,
    Theme,
    alpha,
    Paper,
    Drawer,
    SxProps,
    Divider,
    useTheme,
    IconButton,
    Typography,
} from '@mui/material';

const SxCard = (position: [string, string], translate: string): SxProps<Theme> => ({
    position: 'absolute',
    [position[0]]: { xs: '10vw', sm: '50%' },
    [position[1]]: { xs: '50%', sm: '10vw' },
    transform: {
        sm: `translate(${translate}50%, ${translate}50%)`,
        xs: `translate(${translate}50%, 0) rotate(90deg)`,
    },
    height: { xs: '50vw', sm: '30vw', md: '20vw' },
    borderRadius: { xs: '3.5vw', sm: '2vw', md: '1.5vw' },
});

function formatTimeAgo(timestamp: number, t: (key: string) => string): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return t('history.justNow');
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${t('history.minsAgo')}`;
    const hours = Math.floor(minutes / 60);
    return `${hours} ${t('history.hoursAgo')}`;
}

export default function Display() {
    const theme = useTheme();
    const { t } = useTranslation();
    const [display] = useAtom(DisplayAtom);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { nextTurn, Reverse, Block, clearHistory } = Config();

    const history = display.history ?? [];

    return (
        <>
            <Arrow />
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    position: 'fixed',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Box
                    onClick={nextTurn}
                    sx={{ position: 'absolute', width: '100vw', height: '100vh' }}
                />
                <Box sx={{ top: 10, left: 10, position: 'absolute' }}>
                    <IconButton onClick={() => setSettingsOpen(true)}>
                        <Icon.I icon={Icon.fa.faGear} />
                    </IconButton>
                </Box>

                {/* History Button */}
                <Fab
                    size="medium"
                    color="primary"
                    onClick={() => setHistoryOpen(true)}
                    sx={{ top: 10, right: 10, position: 'absolute' }}>
                    <Icon.I icon={Icon.fa.faClockRotateLeft} />
                </Fab>

                <Box
                    component="img"
                    onClick={Reverse}
                    sx={SxCard(['top', 'left'], '-')}
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ef95353-9f74-45ba-a400-5494417ca165/ddmcdr1-02bbf02c-d83d-4103-b617-fe2d929067ec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVlZjk1MzUzLTlmNzQtNDViYS1hNDAwLTU0OTQ0MTdjYTE2NVwvZGRtY2RyMS0wMmJiZjAyYy1kODNkLTQxMDMtYjYxNy1mZTJkOTI5MDY3ZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jmGpDboFt4-maSQAFOOnxoYNdSfPwaAkfppdBvOOA_A"
                />
                <Box
                    component="img"
                    onClick={Block}
                    sx={SxCard(['bottom', 'right'], '')}
                    src="https://i.pinimg.com/736x/56/2b/78/562b780edc15e726be4cb8944922ca0a.jpg"
                />

                {/* Player Display - 5 rows: 2 previous + 1 current + 2 next */}
                {display.players && display.players.length === 5 && (
                    <Box
                        sx={{
                            gap: 1,
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>
                        {display.players.map((player, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    color: player.color,
                                    fontSize: player.size,
                                    fontWeight: index === 2 ? 700 : 400,
                                    textShadow:
                                        index === 2 ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
                                    opacity: index === 0 || index === 4 ? 0.6 : 1,
                                    transition: 'all 0.3s ease',
                                }}>
                                {player.name}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>

            {/* History Drawer */}
            <Drawer
                anchor="right"
                open={historyOpen}
                onClose={() => setHistoryOpen(false)}
                PaperProps={{
                    sx: {
                        width: 320,
                        bgcolor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(10px)',
                    },
                }}>
                <Box sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                        }}>
                        <Typography variant="h6" fontWeight={600}>
                            <Icon.I icon={Icon.fa.faClockRotateLeft} style={{ marginRight: 8 }} />
                            {t('history.title')}
                        </Typography>
                        <IconButton size="small" onClick={() => setHistoryOpen(false)}>
                            <Icon.I icon={Icon.fa.faXmark} />
                        </IconButton>
                    </Box>

                    {history.length > 0 && (
                        <Box
                            onClick={clearHistory}
                            sx={{
                                py: 1,
                                px: 2,
                                mb: 2,
                                gap: 1,
                                display: 'flex',
                                cursor: 'pointer',
                                borderRadius: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                color: theme.palette.error.main,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.error.main, 0.2),
                                },
                            }}>
                            <Icon.I icon={Icon.fa.faTrash} />
                            <Typography variant="body2" fontWeight={500}>
                                {t('history.clear')}
                            </Typography>
                        </Box>
                    )}

                    <Divider sx={{ mb: 2 }} />

                    {history.length === 0 ? (
                        <Box
                            sx={{
                                py: 4,
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                color: theme.palette.text.disabled,
                            }}>
                            <Icon.I
                                icon={Icon.fa.faInbox}
                                style={{ fontSize: 48, marginBottom: 16 }}
                            />
                            <Typography variant="body2">{t('history.empty')}</Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                gap: 1,
                                display: 'flex',
                                overflowY: 'auto',
                                flexDirection: 'column',
                                maxHeight: 'calc(100vh - 200px)',
                            }}>
                            {[...history].reverse().map((entry, index) => {
                                const actionColor =
                                    entry.action === 'blocked'
                                        ? theme.palette.error.main
                                        : entry.action === 'reversed'
                                        ? theme.palette.warning.main
                                        : theme.palette.primary.main;
                                return (
                                    <Paper
                                        key={index}
                                        elevation={1}
                                        sx={{
                                            p: 1.5,
                                            display: 'flex',
                                            borderRadius: 2,
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderLeft: `4px solid ${actionColor}`,
                                        }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontWeight: 600,
                                                    bgcolor: alpha(actionColor, 0.1),
                                                    color: actionColor,
                                                }}>
                                                #{history.length - index}
                                            </Typography>
                                            <Typography variant="body2" fontWeight={500}>
                                                {entry.player}
                                            </Typography>
                                            {entry.action !== 'normal' && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        px: 0.75,
                                                        py: 0.25,
                                                        fontSize: '0.65rem',
                                                        borderRadius: 0.5,
                                                        bgcolor: alpha(actionColor, 0.15),
                                                        color: actionColor,
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
                            })}
                        </Box>
                    )}
                </Box>
            </Drawer>

            <MainDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}
