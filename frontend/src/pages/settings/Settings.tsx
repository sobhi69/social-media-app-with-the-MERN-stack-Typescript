import { FC } from 'react'
import { FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { axiosInstance } from '../../api/axiosInstance';


interface SettingsProps {

}

const Settings: FC<SettingsProps> = ({ }) => {
    const {curUser,setCurUser} = useAuth()

    const deleteAccount =async () => {
        const confirm = window.confirm('are you sure to delete your account!')

        if (!confirm) {
            return
        }
        const prompt = window.prompt(`please enter this text: ${curUser?.firstname}&${curUser?.lastname}`)
          if (prompt && prompt != `${curUser?.firstname}&${curUser?.lastname}`) {
            alert('wrong code!')
            return
        }

        if (!prompt) {
            alert('please provide valid text!')
            return
        }
        try {
           await axiosInstance.delete(`/account/${curUser?._id}`)
           setCurUser(null)
           localStorage.setItem('curUser','')
       
       } catch (error) {
        alert(error)
       }
    }

    return (
        <div className='flex items-center mt-2 justify-center flex-col'>
            <div className='flex items-center'>
                <FaTwitter className='mr-8 text-[4rem]' color='rgb(62, 30, 160)' />
                <h1 className='text-xl font-bold'>Settings Page!</h1>
                <Link to={'/'} className='ml-10 underline'>go back home</Link>
            </div>

            <button
                onClick={deleteAccount}
                className='mt-40 cursor-pointer bg-red-600 text-white px-3 py-2 rounded-sm '>delete account!</button>
        </div>
    )
}

export default Settings;