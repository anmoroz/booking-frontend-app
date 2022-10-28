import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

export const AppContext = React.createContext(null)

export function AppContextProvider({ children }) {
    const theme= useTheme()
    const isUpMd= useMediaQuery(theme.breakpoints.up('lg'))
    const isUpSm= useMediaQuery(theme.breakpoints.up('sm'))

    const value = React.useMemo(() => {
        const isFullModeActivated = localStorage.getItem('is_full_mode_activated') === 'true'
        const media = (isUpMd || isFullModeActivated) ? 'desktop' : isUpSm ? 'tablet' : 'mobile'
        return {
            media,
        }
    }, [
        isUpMd,
        isUpSm
    ])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
