import { FC } from 'react'
import { FaTwitter } from "react-icons/fa";
interface GreetProps {

}

const Greet: FC<GreetProps> = ({ }) => {
  return (
    <div className='flex mb-8 items-center md:mr-8'>
      <FaTwitter
        color="rgb(62, 30, 160)" className='mr-4 size' size={"3rem"} />
      <div className='text-white'>
        <h2 className='text-lg'>Welcome!</h2>
        <p className='w-56'>Explore the ideas throughout the world.</p>
      </div>
    </div>
  )
}

export default Greet;