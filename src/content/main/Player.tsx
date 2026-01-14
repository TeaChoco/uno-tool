//-Path: "uno-tool/src/content/main/Player.tsx"
import {
    Box,
    alpha,
    Paper,
    Button,
    useTheme,
    TextField,
    IconButton,
    Typography,
    InputAdornment,
} from '@mui/material';
import { useAtom } from 'jotai';
import Icon from '../../custom/Icon';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlayersAtom from '../../context/Players';

export default function Player() {
    const theme = useTheme();
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [players, setPlayers] = useAtom(PlayersAtom);

    const newPlayer = () => {
        if (!error && value.trim() !== '') {
            setPlayers((prev) => [...prev, value.trim()]);
            setValue('');
        }
    };

    const deletePlayer = (index: number) => {
        setPlayers((prev) => {
            const newPlayers = [...prev];
            newPlayers.splice(index, 1);
            return newPlayers;
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !error && value.trim() !== '') newPlayer();
    };

    useEffect(() => {
        const same = players.find((player) => player === value.trim());
        setError(same ? true : false);
    }, [value, players]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon.I icon={Icon.fa.faUsers} style={{ color: theme.palette.primary.main }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                        {t('player.title')}
                    </Typography>
                </Box>
                <Typography
                    variant="caption"
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                    }}>
                    {players.length} {t('tabs.player')}
                </Typography>
            </Box>

            {/* Empty State */}
            {players.length === 0 && (
                <Paper
                    variant="outlined"
                    sx={{
                        py: 4,
                        display: 'flex',
                        borderRadius: 2,
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderStyle: 'dashed',
                        borderColor: alpha(theme.palette.text.disabled, 0.3),
                    }}>
                    <Icon.I
                        icon={Icon.fa.faUserPlus}
                        style={{
                            fontSize: 48,
                            marginBottom: 16,
                            color: theme.palette.text.disabled,
                        }}
                    />
                    <Typography variant="body2" color="text.disabled">
                        {t('player.empty')}
                    </Typography>
                </Paper>
            )}

            {/* Player List */}
            {players.length > 0 && (
                <Reorder.Group
                    axis="y"
                    values={players}
                    onReorder={setPlayers}
                    style={{
                        gap: 8,
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        listStyle: 'none',
                        flexDirection: 'column',
                    }}>
                    {players.map((player, index) => (
                        <Reorder.Item
                            key={player}
                            value={player}
                            style={{ cursor: 'grab' }}
                            whileDrag={{
                                scale: 1.02,
                                cursor: 'grabbing',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                            }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 1.5,
                                    gap: 2,
                                    display: 'flex',
                                    borderRadius: 2,
                                    alignItems: 'center',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                                    },
                                }}>
                                {/* Drag Handle */}
                                <Icon.I
                                    icon={Icon.fa.faGripVertical}
                                    style={{
                                        color: theme.palette.text.disabled,
                                        cursor: 'grab',
                                    }}
                                />

                                {/* Player Number Badge */}
                                <Box
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        display: 'flex',
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    }}>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.primary.contrastText,
                                        }}>
                                        {index + 1}
                                    </Typography>
                                </Box>

                                {/* Player Name */}
                                <Typography variant="body1" fontWeight={500} sx={{ flex: 1 }}>
                                    {player}
                                </Typography>

                                {/* Delete Button */}
                                <IconButton
                                    size="small"
                                    onClick={() => deletePlayer(index)}
                                    sx={{
                                        color: theme.palette.text.disabled,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            color: theme.palette.error.main,
                                            bgcolor: alpha(theme.palette.error.main, 0.1),
                                        },
                                    }}>
                                    <Icon.I icon={Icon.fa.faTrash} />
                                </IconButton>
                            </Paper>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            )}

            {/* Add Player Section */}
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    gap: 2,
                    display: 'flex',
                    borderRadius: 2,
                    flexDirection: 'column',
                }}>
                <TextField
                    fullWidth
                    size="small"
                    value={value}
                    error={error}
                    variant="outlined"
                    label={t('player.name')}
                    placeholder={t('player.name')}
                    onKeyDown={handleKeyPress}
                    helperText={error ? t('player.duplicate') : ''}
                    onChange={(event) => setValue(event.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon.I
                                    icon={Icon.fa.faUser}
                                    style={{ color: theme.palette.text.disabled }}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={newPlayer}
                    disabled={value.trim() === '' || error}
                    startIcon={<Icon.I icon={Icon.fa.faPlus} />}
                    sx={{
                        py: 1.25,
                        fontWeight: 600,
                        borderRadius: 2,
                        textTransform: 'none',
                    }}>
                    {t('player.addPlayer')}
                </Button>
            </Paper>
        </Box>
    );
}
