import { FC } from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import useAuth from '../../hooks/useAuth';

interface TrendingProps {

}

const Trending: FC<TrendingProps> = ({ }) => {
  const logout = useAuth().logOut

  return (
    <div className='ml-4 w-72'>
      <div className='flex items-center text-xl justify-between w-full'>
        <Link to={'/'}><IoHomeSharp className='cursor-pointer text-2xl hover:text-purple-700 delay-75 hover:scale-125' /></Link>
          <Link to={'/settings'}><CiSettings className='cursor-pointer text-2xl hover:text-purple-700 delay-75 hover:scale-125' /></Link>
        <Notifications />
        <IoLogOut
          onClick={logout}
          className='cursor-pointer hover:text-purple-700 text-2xl delay-75 hover:scale-125' />
      </div>
      <div className='px-6 py-3 bg-white w-full rounded-lg mt-8'>
        <p className='text-lg font-semibold mb-4'>Trending for you</p>
        <div className='flex flex-col'>
          <a href='https://chatgpt.com/?utm_source=google&utm_medium=paidsearch_brand&utm_campaign=DEPT_SEM_Google_Brand_Acquisition_EMEA_Egypt_Consumer_CPA_BAU_Mix_English&utm_term=chatgpt&gad_source=1&gclid=Cj0KCQjw_dbABhC5ARIsAAh2Z-Q6KsCpzKzXXzaWuxtXj7Quz8QKhToWHxKk3p7R7XhGD0gtPxr8HZsaApX_EALw_wcB'
            className='font-bold my-4 hover:underline' >#ChatGBT</a>
          <a href="https://react.dev/" className='font-bold my-4 hover:underline delay-75'>#React</a>
          <a href="https://v3.tailwindcss.com/" className='font-bold my-4 hover:underline delay-75'>#Tailwind</a>
          <a href="https://www.typescriptlang.org/" className='font-bold my-4 hover:underline delay-75'>#Typescript</a>
          <a href="https://react-icons.github.io/react-icons/" className='font-bold my-4 hover:underline delay-75'>#React icons</a>
        </div>
      </div>
    </div>
  )
}

export default Trending;