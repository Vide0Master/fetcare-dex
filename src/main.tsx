import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import World from './pages/World'
import FetDex from './pages/Fet-dex'
import FetCare from './pages/FetCare'
import { I18nProvider } from './i18n/I18nContext'
import "./index.css"
import ConfigProvider from './config/ConfigProvider'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/world',
        element: <World />,
    },
    {
        path: 'fet-dex',
        element: <FetDex />
    },
    {
        path: 'fet-dex/:fetcare',
        element: <FetCare />
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider>
            <I18nProvider>
                <RouterProvider router={router} />
            </I18nProvider>
        </ConfigProvider>
    </React.StrictMode>
)