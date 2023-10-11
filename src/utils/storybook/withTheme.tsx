import { IDefaultTheme } from '@/types/storybook/Theme'
import { Decorator } from '@storybook/react'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { createTheme } from './createTheme'

const ThemeContext = React.createContext(createTheme())

ThemeContext.displayName = 'ThemeContext'

type SassThemeChangeHandler = (theme: IDefaultTheme) => void
const ThemeableStory = ({
    children,
    handleSassThemeChange,
}: React.PropsWithChildren<{
    handleSassThemeChange: SassThemeChangeHandler
}>) => {
    const theme = createTheme({
        colors: { mode: useDarkMode() ? 'dark' : 'light' },
    })

    handleSassThemeChange(theme)

    const css = `


  body {
    background: ${theme.colors.background.primary};
  }
  `

    return (
        <ThemeContext.Provider value={theme}>
            <style>{css}</style>
            {children}
        </ThemeContext.Provider>
    )
}

// Temporary solution. When we update to Storybook V5 we will be able to pass data from decorator to story
// https://github.com/storybooks/storybook/issues/340#issuecomment-456013702
export const renderComponentWithTheme = (
    component: React.ComponentType<any>,
    props: any
) => {
    return (
        <ThemeContext.Consumer>
            {(theme) => {
                return React.createElement(component, {
                    ...props,
                    theme,
                })
            }}
        </ThemeContext.Consumer>
    )
}

export const withTheme =
    (handleSassThemeChange: SassThemeChangeHandler): Decorator =>
    // eslint-disable-next-line react/display-name
    (story) =>
        (
            <ThemeableStory handleSassThemeChange={handleSassThemeChange}>
                {story()}
            </ThemeableStory>
        )
