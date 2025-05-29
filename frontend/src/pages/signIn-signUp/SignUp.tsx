import { FC, FormEvent, SetStateAction, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import SignUpForm from '../../interfaces/SignUpForm'

interface SignUpProps {
    setRegistring: React.Dispatch<SetStateAction<boolean>>
}

const SignUp: FC<SignUpProps> = ({ setRegistring }) => {
    const { signUp } = useAuth()
    const [form, setForm] = useState<SignUpForm>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender:"male"
    })


    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        signUp(form)
    }

    return (
        <div className='flex flex-col items-center bg-white rounded-sm p-8'>
            <h1 className='text-3xl mb-5'>Register!</h1>
            <form className='flex justify-center flex-col items-center'
                onSubmit={(e) => handleSubmit(e)}>
                <input
                    value={form.firstname}
                    onChange={(e) => updateForm({ firstname: e.target.value })}
                    type="text"
                    placeholder='Enter your firstname' />

                <input
                    value={form.lastname}
                    onChange={(e) => updateForm({ lastname: e.target.value })}
                    type="text"
                    placeholder='Enter your lastname' />
                <input
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    type="email"
                    required
                    placeholder='Enter your email' />
                    
                  <div className='flex justify-between items-center w-full'>
                    <label htmlFor="gender">Gender :</label>
                    <select 
                    onChange={(e) => updateForm({gender:e.target.value})}
                    id='gender' className='my-1 p-2'>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                  </div>
                <input
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                    type="password"
                    min={6}
                    max={20}
                    placeholder='password' />
                <input
                    value={form.confirmPassword}
                    onChange={(e) => updateForm({ confirmPassword: e.target.value })}
                    type="password"
                    min={6}
                    max={20}
                    placeholder='Confirm Password' />
                    <button className='btn my-8' type="submit">Sign Up</button>
            </form>

            <div >if you already have an account <button
                    onClick={() => setRegistring(false)}
                    className='underline text-blue-700'>sign-in</button>
            </div>

        </div>
    )
}

export default SignUp;