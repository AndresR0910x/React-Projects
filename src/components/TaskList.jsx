import { useTask } from "../context/TaskContext"
import { useEffect } from "react"

function TaskList() {
  
  const {tasks, getTasks} = useTask()

  useEffect(() => {
    getTasks()

  }, [])
  
  return (
    <div>
      {
        tasks.map(task => (
          <div>
            <h1>{JSON.stringify(task.name)}</h1>
            <p>{JSON.stringify(task.done)}</p>
          </div>
        )
      )}

    </div>
  )
}

export default TaskList