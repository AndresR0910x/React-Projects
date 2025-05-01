import React, { useEffect, useState } from 'react'
import { client } from '../supabase/client'
import { useNavigate } from 'react-router'
import TaskForm from '../components/TaskForm'
import { TaskContext } from '../context/TaskContext'
import TaskList from '../components/TaskList'


function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false)
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
        <header>
          <span> Task pending</span>
          <button onClick={() => setShowTaskDone(!showTaskDone)}>
            Show Tasks done
          </button>
        </header>
        <TaskList
          done = {showTaskDone}
        ></TaskList>
    </div>
  )
}

export default Home