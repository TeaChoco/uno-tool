//-Path: "uno-tool/src/content/main/Main.tsx"
import Player from './Player';
import { useState } from 'react';
import Setting from './Setting';
import History from '../history/History';
import Icon from '../../custom/Icon';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Slide, Paper, Button, Dialog, IconButton, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { TransitionProps } from '@mui/material/transitions';
import PlayersAtom from '../../context/Players';
import DisplayAtom from '../../context/Display';
import React from 'react';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type MainDialogProps = {
    open: boolean;
    onClose: () => void;
};

export default function MainDialog({ open, onClose }: MainDialogProps) {
    const { t } = useTranslation();
    const [content, setContent] = useState('player');
    const [, setPlayers] = useAtom(PlayersAtom);
    const [, setDisplay] = useAtom(DisplayAtom);

    const Contents: [string, string, React.ReactNode][] = [
        ['player', t('tabs.player'), <Player />],
        ['setting', t('tabs.setting'), <Setting />],
        ['history', t('tabs.history'), <History />],
    ];

    return (
        <Dialog
            fullWidth
            open={open}
            maxWidth="md"
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    m: 2,
                    borderRadius: 3,
                    maxHeight: '90vh',
                },
            }}>
            <Paper elevation={0} sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Typography variant="h6" fontWeight={600}>
                        <Icon.I icon={Icon.fa.faGamepad} style={{ marginRight: 8 }} />
                        {t('common.settings')}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Icon.I icon={Icon.fa.faXmark} />
                    </IconButton>
                </Box>

                {/* Tabs */}
                <TabContext value={content}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(_, value) => setContent(value)}>
                            {Contents.map((contents, index) => (
                                <Tab key={index} label={contents[1]} value={contents[0]} />
                            ))}
                        </TabList>
                    </Box>
                    {Contents.map((contents, index) => (
                        <TabPanel key={index} value={contents[0]} sx={{ p: 0 }}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    gap: 2,
                                    display: 'flex',
                                    borderRadius: 2,
                                    maxHeight: '50vh',
                                    overflowY: 'auto',
                                    flexDirection: 'column',
                                }}>
                                {contents[2]}
                            </Paper>
                        </TabPanel>
                    ))}
                </TabContext>

                {/* Clear All Data Button */}
                <Box sx={{ mt: 2 }}>
                    <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        onClick={() => {
                            if (confirm(t('common.clearAll') + '?')) {
                                setPlayers([]);
                                setDisplay({
                                    turn: undefined,
                                    retrun: false,
                                    history: [],
                                    players: [],
                                    unoPlayers: [],
                                    winners: [],
                                    pastGames: [],
                                });
                            }
                        }}
                        startIcon={<Icon.I icon={Icon.fa.faTrash} />}>
                        {t('common.clearAll')}
                    </Button>
                </Box>
            </Paper>
        </Dialog>
    );
}
