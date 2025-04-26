import './App.css';
import { useEffect } from 'react';
import Login from './pages/Login';
import {Routes, Route, useNavigate } from 'react-router'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { client } from './supabase/client';
import { TaskContextProvider } from './context/TaskContext';


function App() {

  const navigate = useNavigate();
  useEffect(() => {
    client.auth.onAuthStateChange((event, session) => {
      if(!session){
        navigate('/login')
      }else {
        navigate('/')
      }
    })
  },[navigate])

  return (
    <>
      <div className='App'>
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home></Home>}/>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </TaskContextProvider>
        
      </div>
     
    </>
  )
}

export default App
