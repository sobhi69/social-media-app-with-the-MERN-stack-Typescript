import { FC, useState } from 'react'
import Greet from '../../components/greet/Greet';
import SignIn from './SignIn';
import SignUp from './SignUp';
interface AuthProps {

}

const Auth: FC<AuthProps> = ({ }) => {
    const [registering, setRegistring] = useState(false)
    return (
        <div className=' flex flex-col md:flex-row justify-center items-center h-screen m-auto'>
            <div className=" auth-container"></div>
            <Greet />
            {!registering ?
                <SignIn
                    setRegistring={setRegistring}
                /> :
                <SignUp
                    setRegistring={setRegistring}
                />}
        </div>

    )
}

export default Auth;