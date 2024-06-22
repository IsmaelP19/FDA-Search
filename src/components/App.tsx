import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './styles/index.css'
import '../styles/App.css'
import Home from './Home'
import DrugDetail from './DrugDetail'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/drugs/:id",
        element: <DrugDetail />
    }
])

const App: React.FC = () => {

    return (
        <RouterProvider router={router} />
    )
}

export default App
