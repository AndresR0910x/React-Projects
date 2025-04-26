import { useEffect, useState } from 'react'
import {client} from '../supabase/client'
import { useNavigate } from 'react-router'

export default function Login () {

  const navigate = useNavigate()
  const [ email, setEmail ] = useState("")
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await client.auth.signInWithOtp({
        email,
      })
      
    }catch(error){
      console.error(error);
    }
    
  }

  useEffect(()=>{

    const checkUser = async () => {
      const { data: {user}} = await client.auth.getUser()
      if(user){
        navigate('/')
      }
    }
    checkUser()
  }, [navigate])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder='youremail@example.com'
        onChange={(e) => setEmail(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  )
}

