import { FC } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

interface SideProfileProps {

}

const SideProfile: FC<SideProfileProps> = () => {
    const curUser = useAuth().curUser

    return (
        <div className="sidebar-profile mt-3 w-full rounded-2xl pb-3 bg-gradient-to-l from-slate-50 to-slate-200 flex flex-col items-center">
            <img src={curUser?.coverImg} className='w-full object-cover sm:h-28 h-40 rounded-t-2xl' alt="" />
            <img src={curUser?.profileImg} className='sm:w-16 w-20 rounded-full -mt-10' alt="" />
            <h2 className='font-bold mb-2 text-lg'>{`${curUser?.firstname} ${curUser?.lastname}`}</h2>
            <p className='mb-2 text-lg'>{curUser?.worksAt || 'Job Title'}</p>
            <div className='bg-black h-px w-4/5 my-4'></div>
            <div className='flex justify-between'>
                <div className='flex flex-col items-center'>
                    <p className='font-bold'>{curUser?.followers.length || 0}</p> 
                    <p>Followeres</p>
                </div>
                <div className='bg-black h-12 w-px mx-4'></div>
                <div className='flex flex-col items-center'>
                    <p className='font-bold'>{curUser?.following.length || 0}</p>
                    <p>Following</p>
                </div>
            </div>
            <div className='bg-black h-px w-4/5 my-4'></div>
            <Link to={'/profile'} className='text-purple-700 font-bold text-xl'>My Profile</Link>
        </div>
    )
}

export default SideProfile;