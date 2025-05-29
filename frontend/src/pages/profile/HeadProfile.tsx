import { FC } from 'react'
import useAuth from '../../hooks/useAuth';

interface HeadProfileProps {

}


const HeadProfile: FC<HeadProfileProps> = ({ }) => {
    const curUser = useAuth().curUser
    return (
        <div className='rounded-xl mb-4'>
            <div className="sidebar-profile mt-3 rounded-2xl pb-3 bg-gradient-to-l from-slate-50 to-slate-200 flex flex-col items-center">
                <div className='h-56 w-full'>
                    <img src={curUser?.coverImg} className='w-full h-full object-cover rounded-t-2xl' alt="" />
                </div>
                <img src={curUser?.profileImg} className='w-20 rounded-full -mt-10' alt="" />
                <h2 className='font-bold mb-1 text-lg'>{`${curUser?.firstname} ${curUser?.lastname}`}</h2>
                <p className='mb-1'>{curUser?.worksAt || 'Job Title'}</p>
                <div className='bg-slate-950 h-px w-4/5 my-4'></div>
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
                    <div className='bg-black h-12 w-px mx-4'></div>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold'>{curUser?.posts.length || 0}</p>
                        <p>Posts</p>
                    </div>
                </div>
                <div className='bg-slate-950 h-px w-4/5 mt-4'></div>
            </div>
        </div>
    )
}

export default HeadProfile;