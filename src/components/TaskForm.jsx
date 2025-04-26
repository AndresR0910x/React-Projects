import { useState } from 'react'
import { client } from '../supabase/client'

function TaskForm() {
  

  const [taskName, setTaskName] = useState('')
  
  const handleSubmit = async e => {
    e.preventDefault()
    try{
    
        const { data: { user } } = await client.auth.getUser()
        const result = await client.from('tasks').insert({
            name: taskName,
            userId: user.id
        })
    }catch(error){
        console.log(error)
    }
    
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name='taskName' 
                placeholder='Write a task name'
                onChange={e => setTaskName(e.target.value)}
            />
            <button>Añadir</button>
        </form>
        
    </div>
  )
}

export default TaskForm