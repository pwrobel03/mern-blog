import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
    const { theme } = useSelector(state => state.theme)
    return (
        <div className={theme}>
            <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-zinc-900 dark:text-slate-200 dark:border-red">
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider