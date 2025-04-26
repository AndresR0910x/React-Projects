import React, { useEffect } from 'react'
import { client } from '../supabase/client'
import { useNavigate } from 'react-router'
import TaskForm from '../components/TaskForm'
import { TaskContext } from '../context/TaskContext'
import { useTask } from '../context/TaskContext'
import TaskList from '../components/TaskList'


function Home() {

  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data: {user}} = await client.auth.getUser()
      if(!user){
        navigate('/login')
      }
    } 
    checkUser()
  }, [navigate])

  return (
    <div>
        <button onClick={async () => {
          await client.auth.signOut()
          navigate('/login')
          }}>
            Logout
        </button>
        <TaskForm></TaskForm>
        <TaskList></TaskList>
    </div>
  )
}

export default Home