import { FC, FormEvent, SetStateAction, useState } from 'react'
import SignInForm from '../../interfaces/SignInForm'
import useAuth from '../../hooks/useAuth'
import './signIn.css'
interface SignInProps {
    setRegistring:React.Dispatch<SetStateAction<boolean>>
}

const SignIn: FC<SignInProps> = ({ setRegistring }) => {

    const { signIn } = useAuth()
    const [form, setForm] = useState<SignInForm>({
        email: "",
        password: ""
    })

    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await signIn(form)

    }
    
  return (
    <div className='flex flex-col items-center w-80 bg-white rounded-sm p-10'>
        <h1 className='text-3xl mb-5'>Log In</h1>
      <form onSubmit={(e) => handleSubmit(e)} >
                <div className="group-form">
                    <input
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                        type="email"
                        placeholder='Enter your email' />
                </div>
                <div className="group-form">
                    <input
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                        type="password"
                        min={6}
                        max={20}
                        placeholder='password' />
                </div>
                <button className='my-7 btn' type="submit">Sign In</button>
            </form>

     <div >if you already have an account <button
        onClick={() => setRegistring(true)}
      className='underline text-blue-700'>sign-Up</button>
      </div>
    </div>
  )
}

export default SignIn;