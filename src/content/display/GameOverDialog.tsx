import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useTheme,
    alpha,
} from '@mui/material';
import Icon from '../../custom/Icon';

interface Winner {
    name: string;
    rank: number;
}

interface GameOverDialogProps {
    open: boolean;
    winners: Winner[];
    onRestart: () => void;
}

export default function GameOverDialog({ open, winners, onRestart }: GameOverDialogProps) {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 4, p: 2, textAlign: 'center' },
            }}>
            <DialogTitle>
                <Typography
                    variant="h2"
                    fontWeight={800}
                    color="primary"
                    sx={{ textShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
                    GAME OVER
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                    {winners?.map((winner) => (
                        <Box
                            key={winner.rank}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                display: 'flex',
                                border: '1px solid',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                bgcolor:
                                    winner.rank === 1
                                        ? alpha(theme.palette.warning.main, 0.1)
                                        : alpha(theme.palette.primary.dark, 0.03),
                                borderColor:
                                    winner.rank === 1
                                        ? alpha(theme.palette.warning.main, 0.3)
                                        : alpha(theme.palette.primary.dark, 0.3),
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        bgcolor:
                                            winner.rank === 1
                                                ? theme.palette.warning.main
                                                : theme.palette.primary.dark,
                                        color:
                                            winner.rank === 1
                                                ? theme.palette.warning.contrastText
                                                : theme.palette.text.secondary,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800,
                                        fontSize: '1.1rem',
                                    }}>
                                    {winner.rank}
                                </Box>
                                <Typography variant="h6" fontWeight={600}>
                                    {winner.name}
                                </Typography>
                            </Box>
                            {winner.rank === 1 && (
                                <Icon.I
                                    icon={Icon.fa.faCrown}
                                    style={{ color: theme.palette.warning.main, fontSize: 20 }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={onRestart}
                    startIcon={<Icon.I icon={Icon.fa.faRotateRight} />}
                    sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        boxShadow: theme.shadows[4],
                    }}>
                    Play Again
                </Button>
            </DialogActions>
        </Dialog>
    );
}
