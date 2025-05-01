import { createContext, useContext, useState } from "react";
import { client } from "../supabase/client";
export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('useTasks must be used within a TaskContext')
    return context  
}

export const TaskContextProvider = ({children}) => {
    //Sirve para importar el estado de las tareas actuales en la bdd

    const [tasks, setTasks] = useState([])
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTasks = async (done = false) =>{
        setLoading(true)
        const {data: {user}} = await client.auth.getUser()
        
        const {error, data } = await client.from('tasks').select().eq("userId", user.id).eq("done", done).order("id", {ascending: true})
        if (error) throw error;
        setTasks(data)
        setLoading(false)
        
    }

    const createTask = async (taskName) => {
        setAdding(true)
        try{
            const { data: {user}} = await client.auth.getUser()
            const {error, data} = await client.from('tasks').insert({
                name: taskName,
                userId: user.id
            }).select();
            if (error) throw error;

            setTasks([...tasks, ...data])
            console.log(data)
        }catch(error){
            console.log(error)
        }finally {
            setAdding(false)
        }
        
    }

    const deleteTask = async (id) => {
        const {data : {user}} = await client.auth.getUser()

        const {error, data} = await client.from('tasks').delete().eq('userId', user.id).eq('id', id)
    
        if (error) throw error;

        setTasks(tasks.filter(task => task.id != id))

    }

    const updateTask = async (id, updatedFields) => {
        const { data: {user}} = await client.auth.getUser()

        const { error, data} = await client.from('tasks').update(updatedFields).eq("userId", user.id).eq("id", id)

        if (error) throw error;

        setTasks(tasks.filter(task => task.id != id))
    }
    

    
    return <TaskContext.Provider value={{tasks, getTasks, createTask, adding, loading, deleteTask, updateTask} }>
        {children}
    </TaskContext.Provider>
}