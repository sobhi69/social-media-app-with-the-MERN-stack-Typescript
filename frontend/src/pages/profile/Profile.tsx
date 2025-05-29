import { FC } from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Trending from '../../components/trending/Trending';
import ProfilePage from './ProfilePage';

interface ProfileProps {
  
}

const Profile: FC<ProfileProps> = ({  }) => {
  return (
    <div className='flex p-4 bg-gray-100 h-full'>
        <Sidebar curPage='profile' />
        <ProfilePage />
        <Trending />
    </div>
  )
}

export default Profile;