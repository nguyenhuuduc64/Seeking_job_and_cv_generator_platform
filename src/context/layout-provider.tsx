import React, { createContext, useContext, useState, type ReactNode } from 'react'

interface LayoutContextType {
    isCollapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [isCollapsed, setCollapsed] = useState(false)

    return (
        <LayoutContext.Provider value={{ isCollapsed, setCollapsed }}>
            {children}
        </LayoutContext.Provider>
    )
}

export const useLayout = () => {
    const context = useContext(LayoutContext)
    if (!context) {
        throw new Error('useLayout phải được sử dụng trong LayoutProvider thưa ông chủ!')
    }
    return context
}