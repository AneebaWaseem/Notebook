import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import MyNotes from './components/MyNotes.jsx'
import Notes from './components/Notes.jsx'
import Add from './components/Add.jsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'mynotes', element: <MyNotes /> },
      { path: 'mynotes/:id', element: <Notes/>},
      { path: 'add', element: <Add /> },
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router ={router}/>
    </>
  )
}

export default App
