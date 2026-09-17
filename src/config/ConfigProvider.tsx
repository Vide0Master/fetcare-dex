import React, { useState, useEffect } from 'react'
import { ConfigContext, type AppConfig } from './context'

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<AppConfig | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        let isMounted = true

        fetch('/config.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`)
                }
                return res.json()
            })
            .then(data => {
                if (isMounted) {
                    setConfig(data)
                    setIsLoading(false)
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error(String(err)))
                    setIsLoading(false)
                }
            })

        return () => {
            isMounted = false
        }
    }, [])

    const value = {
        config,
        isLoading,
        error,
    }

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    )
}