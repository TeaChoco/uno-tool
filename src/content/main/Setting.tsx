//-Path: "uno-tool/src/content/main/Setting.tsx"
import i18n from '../../i18n';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n';
import Icon from '../../custom/Icon';
import SettingAtom from '../../context/Setting';
import { Box, alpha, Paper, Switch, useTheme, Typography, FormControlLabel } from '@mui/material';

export default function Setting() {
    const theme = useTheme();
    const { t } = useTranslation();
    const [setting, setSetting] = useAtom(SettingAtom);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setSetting((prev) => ({ ...prev, language: langCode }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Language Section */}
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        mb: 1.5,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.text.secondary,
                    }}>
                    <Icon.I icon={Icon.fa.faGlobe} />
                    {t('setting.language')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {languages.map((lang) => (
                        <Paper
                            key={lang.code}
                            elevation={setting.language === lang.code ? 4 : 1}
                            onClick={() => handleLanguageChange(lang.code)}
                            sx={{
                                px: 2,
                                py: 1.5,
                                flex: 1,
                                gap: 1,
                                display: 'flex',
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 2,
                                transition: 'all 0.2s ease',
                                border:
                                    setting.language === lang.code
                                        ? `2px solid ${theme.palette.primary.main}`
                                        : `2px solid transparent`,
                                bgcolor:
                                    setting.language === lang.code
                                        ? alpha(theme.palette.primary.main, 0.1)
                                        : 'transparent',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                },
                            }}>
                            <Typography sx={{ fontSize: '1.5rem' }}>{lang.flag}</Typography>
                            <Typography
                                variant="body2"
                                fontWeight={setting.language === lang.code ? 600 : 400}>
                                {lang.name}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            {/* Appearance Section */}
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        mb: 1.5,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.text.secondary,
                    }}>
                    <Icon.I icon={Icon.fa.faPalette} />
                    {t('setting.appearance')}
                </Typography>
                <Paper
                    elevation={2}
                    sx={{
                        px: 2,
                        py: 1,
                        display: 'flex',
                        borderRadius: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Icon.I
                            icon={setting.darkmode ? Icon.fa.faMoon : Icon.fa.faSun}
                            style={{
                                color: setting.darkmode
                                    ? theme.palette.info.main
                                    : theme.palette.warning.main,
                            }}
                        />
                        <Typography variant="body2">
                            {setting.darkmode ? t('setting.darkMode') : t('setting.lightMode')}
                        </Typography>
                    </Box>
                    <FormControlLabel
                        label=""
                        control={
                            <Switch
                                checked={setting.darkmode}
                                onChange={(_, checked) =>
                                    setSetting((prev) => ({ ...prev, darkmode: checked }))
                                }
                            />
                        }
                    />
                </Paper>
            </Box>
        </Box>
    );
}
