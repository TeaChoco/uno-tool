//-Path: "uno-tool/src/content/history/History.tsx"
import {
    Box,
    Paper,
    alpha,
    Drawer,
    Divider,
    useTheme,
    IconButton,
    Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import Icon from '../../custom/Icon';
import Config from '../display/Config';
import { useTranslation } from 'react-i18next';
import DisplayAtom from '../../context/Display';

function formatTimeAgo(timestamp: number, t: (key: string) => string): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return t('history.justNow');
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${t('history.minsAgo')}`;
    const hours = Math.floor(minutes / 60);
    return `${hours} ${t('history.hoursAgo')}`;
}

interface HistoryDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function HistoryDrawer({ open, onClose }: HistoryDrawerProps) {
    const theme = useTheme();
    const { t } = useTranslation();
    const [display] = useAtom(DisplayAtom);
    const { clearHistory } = Config();
    const history = display.history ?? [];

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
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
                    <IconButton size="small" onClick={onClose}>
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
                        <Icon.I icon={Icon.fa.faInbox} style={{ fontSize: 48, marginBottom: 16 }} />
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
                                      : entry.action === 'won'
                                        ? theme.palette.success.main
                                        : entry.action === 'uno'
                                          ? '#d62828'
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
    );
}
