//-Path: "uno-tool/src/content/main/Player.tsx"
import {
    Box,
    alpha,
    Paper,
    useTheme,
    TextField,
    IconButton,
    Typography,
    InputAdornment,
    Divider,
} from '@mui/material';
import { useAtom } from 'jotai';
import Icon from '../../custom/Icon';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlayersAtom from '../../context/Players';
import SavedPlayersAtom from '../../context/SavedPlayers';

export default function Player() {
    const theme = useTheme();
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [players, setPlayers] = useAtom(PlayersAtom);
    const [savedPlayers, setSavedPlayers] = useAtom(SavedPlayersAtom);
    const [error, setError] = useState<boolean>(false);

    const createPlayer = () => {
        if (!error && value.trim() !== '') {
            const name = value.trim();
            if (!savedPlayers.includes(name)) {
                setSavedPlayers((prev) => [...prev, name]);
            }
            // Optional: Auto-add to game? For now, just add to saved.
            setValue('');
        }
    };

    const addToGame = (name: string) => {
        if (!players.includes(name)) {
            setPlayers((prev) => [...prev, name]);
        }
    };

    const removeFromGame = (index: number) => {
        setPlayers((prev) => {
            const newPlayers = [...prev];
            newPlayers.splice(index, 1);
            return newPlayers;
        });
    };

    const deleteSavedPlayer = (name: string) => {
        setSavedPlayers((prev) => prev.filter((p) => p !== name));
        // Optional: Remove from game if they are deleted from saved?
        // setPlayers(prev => prev.filter(p => p !== name));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !error && value.trim() !== '') createPlayer();
    };

    useEffect(() => {
        const same = savedPlayers.find((player) => player === value.trim());
        setError(same ? true : false);
    }, [value, savedPlayers]);

    return (
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Left Column: Saved Players */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon.I
                            icon={Icon.fa.faAddressBook}
                            style={{ color: theme.palette.text.secondary }}
                        />
                        <Typography variant="subtitle1" fontWeight={600}>
                            {t('player.saved')}
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        {savedPlayers.length}
                    </Typography>
                </Box>

                {/* Add New Player Input */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: 1.5,
                        display: 'flex',
                        borderRadius: 2,
                        alignItems: 'center',
                        gap: 1,
                    }}>
                    <TextField
                        fullWidth
                        size="small"
                        value={value}
                        error={error}
                        variant="outlined"
                        placeholder={t('player.name')}
                        onKeyDown={handleKeyPress}
                        onChange={(event) => setValue(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon.I
                                        icon={Icon.fa.faUserPlus}
                                        style={{ color: theme.palette.text.disabled, fontSize: 14 }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.9rem' } }}
                    />
                    <IconButton
                        color="primary"
                        disabled={value.trim() === '' || error}
                        onClick={createPlayer}
                        sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                        }}>
                        <Icon.I icon={Icon.fa.faPlus} />
                    </IconButton>
                </Paper>

                {/* Saved Players List */}
                {savedPlayers.length === 0 && (
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.disabled">
                            {t('player.noSaved')}
                        </Typography>
                    </Box>
                )}
                {savedPlayers.length > 0 && (
                    <Reorder.Group
                        axis="y"
                        values={savedPlayers}
                        onReorder={setSavedPlayers}
                        style={{
                            gap: 8,
                            margin: 0,
                            padding: 0,
                            display: 'flex',
                            listStyle: 'none',
                            flexDirection: 'column',
                            overflowY: 'auto',
                            maxHeight: '50vh',
                            paddingRight: '4px',
                        }}>
                        {savedPlayers.map((player) => {
                            const isPlaying = players.includes(player);
                            return (
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
                                        variant="outlined"
                                        sx={{
                                            p: 1,
                                            pl: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            justifyContent: 'space-between',
                                            bgcolor: isPlaying
                                                ? alpha(theme.palette.success.main, 0.05)
                                                : 'background.paper',
                                            borderColor: isPlaying
                                                ? alpha(theme.palette.success.main, 0.3)
                                                : 'divider',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.02),
                                            },
                                        }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Icon.I
                                                icon={Icon.fa.faGripVertical}
                                                style={{
                                                    color: theme.palette.text.disabled,
                                                    cursor: 'grab',
                                                    fontSize: 12,
                                                }}
                                            />
                                            <Typography variant="body2" fontWeight={500}>
                                                {player}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <IconButton
                                                size="small"
                                                color={isPlaying ? 'success' : 'default'}
                                                onClick={() => !isPlaying && addToGame(player)}
                                                disabled={isPlaying}>
                                                <Icon.I
                                                    icon={
                                                        isPlaying
                                                            ? Icon.fa.faCheck
                                                            : Icon.fa.faArrowRight
                                                    }
                                                />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => deleteSavedPlayer(player)}
                                                sx={{
                                                    color: theme.palette.text.disabled,
                                                    '&:hover': { color: theme.palette.error.main },
                                                }}>
                                                <Icon.I
                                                    icon={Icon.fa.faTrash}
                                                    style={{ fontSize: 12 }}
                                                />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                )}
            </Box>

            <Divider
                flexItem
                orientation="vertical"
                sx={{ display: { xs: 'none', md: 'block' } }}
            />

            {/* Right Column: Playing Players */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon.I
                            icon={Icon.fa.faGamepad}
                            style={{ color: theme.palette.primary.main }}
                        />
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
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                        <Icon.I
                            icon={Icon.fa.faGhost}
                            style={{
                                fontSize: 32,
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
                            height: '100%',
                            display: 'flex',
                            listStyle: 'none',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            overflowX: 'hidden',
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
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
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
                                            width: 24,
                                            height: 24,
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
                                                fontSize: '0.7rem',
                                                color: theme.palette.primary.contrastText,
                                            }}>
                                            {index + 1}
                                        </Typography>
                                    </Box>

                                    {/* Player Name */}
                                    <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
                                        {player}
                                    </Typography>

                                    {/* Delete Button */}
                                    <IconButton
                                        size="small"
                                        onClick={() => removeFromGame(index)}
                                        sx={{
                                            color: theme.palette.text.disabled,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                color: theme.palette.error.main,
                                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                            },
                                        }}>
                                        <Icon.I icon={Icon.fa.faXmark} />
                                    </IconButton>
                                </Paper>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                )}
            </Box>
        </Box>
    );
}
