//-Path: "uno-tool/src/content/display/Display.tsx"
import Config from './Config';
import { useAtom } from 'jotai';
import { useState } from 'react';
import Icon from '../../custom/Icon';
import MainDialog from '../main/Main';
import Arrow from '../../components/Arrow';
import GameOverDialog from './GameOverDialog';
import DisplayAtom from '../../context/Display';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Theme, alpha, SxProps, useTheme, IconButton, Typography } from '@mui/material';

const SxCard = (isWidth?: boolean): SxProps<Theme> => ({
    transform: {
        lg: 'rotate(-90deg)',
        xs: 'rotate(0deg)',
    },
    borderRadius: { xs: '3.5vw', sm: '2vw', md: '1.5vw' },
    [isWidth ? 'width' : 'height']: { xs: '40vw', sm: '30vw', md: '20vw' },
});

export default function Display() {
    const theme = useTheme();
    const [display] = useAtom(DisplayAtom);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { nextTurn, Reverse, Block, Uno, Restart } = Config();

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
                    flexDirection: { xs: 'column', lg: 'row' },
                }}>
                <Box sx={{ top: 10, left: 10, position: 'absolute', zIndex: 1 }}>
                    <IconButton onClick={() => setSettingsOpen(true)}>
                        <Icon.I icon={Icon.fa.faGear} />
                    </IconButton>
                </Box>

                <Box
                    onClick={nextTurn}
                    sx={{
                        width: { xs: '100%', lg: '70dvw' },
                        height: { xs: '70dvh', lg: '100%' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {/* Player Display - 5 rows: 2 previous + 1 current + 2 next */}
                    {display.players &&
                        display.players.length === 5 &&
                        display.turn !== undefined && (
                            <Box
                                sx={{
                                    gap: 1,
                                    display: 'flex',
                                    userSelect: 'none',
                                    alignItems: 'center',
                                    pointerEvents: 'none',
                                    flexDirection: 'column',
                                }}>
                                <AnimatePresence mode="popLayout">
                                    {display.players.map((player, index) => (
                                        <motion.div
                                            layout
                                            key={`${player.name}-${index}`}
                                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                            animate={{
                                                opacity: index === 0 || index === 4 ? 0.6 : 1,
                                                scale: index === 2 ? 1.2 : 1,
                                                y: 0,
                                            }}
                                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                                mass: 1,
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                marginBottom: index === 2 ? '24px' : '8px',
                                                marginTop: index === 2 ? '24px' : '8px',
                                            }}>
                                            {player.index !== -1 && (
                                                <Box
                                                    sx={{
                                                        px: 1,
                                                        py: 0.25,
                                                        borderRadius: 4,
                                                        fontSize: index === 2 ? '1.2rem' : '1rem',
                                                        fontWeight: 700,
                                                        color:
                                                            index === 2
                                                                ? theme.palette.background.default
                                                                : player.color,
                                                        bgcolor:
                                                            index === 2
                                                                ? player.color
                                                                : alpha(player.color, 0.1),
                                                        transition: 'all 0.3s ease',
                                                        pointerEvents: 'none',
                                                        userSelect: 'none',
                                                    }}>
                                                    #{player.index + 1}
                                                </Box>
                                            )}
                                            <Typography
                                                sx={{
                                                    pointerEvents: 'none',
                                                    color: player.color,
                                                    fontSize: player.size,
                                                    fontWeight: index === 2 ? 700 : 500,
                                                    textShadow:
                                                        index === 2
                                                            ? '0 0 30px rgba(255,255,255,0.4)'
                                                            : 'none',
                                                    transition: 'all 0.3s ease',
                                                    userSelect: 'none',
                                                }}>
                                                {player.name}
                                            </Typography>
                                            {display.unoPlayers?.includes(player.name) && (
                                                <Box
                                                    component="img"
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/960px-UNO_Logo.svg.png"
                                                    sx={{
                                                        height: index === 2 ? '3vw' : '2vw',
                                                        objectFit: 'contain',
                                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </Box>
                        )}
                </Box>

                <Box
                    sx={{
                        gap: 2,
                        m: 'auto',
                        display: 'flex',
                        userSelect: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: { xs: 'row', lg: 'column' },
                    }}>
                    <Box
                        sx={SxCard()}
                        component="img"
                        onClick={Reverse}
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5ef95353-9f74-45ba-a400-5494417ca165/ddmcdr1-02bbf02c-d83d-4103-b617-fe2d929067ec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVlZjk1MzUzLTlmNzQtNDViYS1hNDAwLTU0OTQ0MTdjYTE2NVwvZGRtY2RyMS0wMmJiZjAyYy1kODNkLTQxMDMtYjYxNy1mZTJkOTI5MDY3ZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jmGpDboFt4-maSQAFOOnxoYNdSfPwaAkfppdBvOOA_A"
                    />
                    <Box
                        sx={SxCard(true)}
                        onClick={Uno}
                        component="img"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/UNO_Logo.svg/960px-UNO_Logo.svg.png"
                    />
                    <Box
                        sx={SxCard()}
                        onClick={Block}
                        component="img"
                        src="https://i.pinimg.com/736x/56/2b/78/562b780edc15e726be4cb8944922ca0a.jpg"
                    />
                </Box>
            </Box>

            {/* Game Over Dialog */}
            <GameOverDialog
                open={display.turn === undefined && display.winners?.length > 0}
                winners={display.winners || []}
                onRestart={Restart}
            />

            <MainDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </>
    );
}
