import { create } from '@storybook/theming/create'
import { createTheme } from '../src/utils/storybook/createTheme'
import { IDefaultTheme } from '../src/types/storybook/Theme'

const createStorybookTheme = (theme: IDefaultTheme) => {
    return create({
        base: theme.colors.mode,

        // UI
        appBg: theme.colors.background.canvas,
        appContentBg: theme.colors.background.primary,
        appBorderRadius: 0,

        // Typography
        fontBase: theme.typography.fontFamily,
        fontCode: theme.typography.fontFamilyMonospace,

        // Text colors
        textColor: theme.colors.text.primary,
        textInverseColor: theme.colors.background.primary,

        // Toolbar default and active colors
        barTextColor: theme.colors.text.primary,
        barBg: theme.colors.background.primary,

        // Form colors
        inputBg: theme.components.input.background,
        inputBorder: theme.components.input.borderColor,
        inputTextColor: theme.components.input.text,

        brandTitle: 'Jerens',
        brandUrl: 'https://www.jerensl.com',
        brandTarget: '_self',
    })
}

const DefaultThemeLight = createStorybookTheme(
    createTheme({ colors: { mode: 'light' } })
)
const DefaultThemeDark = createStorybookTheme(
    createTheme({ colors: { mode: 'dark' } })
)

export { DefaultThemeLight, DefaultThemeDark }
