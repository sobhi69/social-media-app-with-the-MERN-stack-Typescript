import { FC } from 'react'
import HeadProfile from './HeadProfile';
import Content from '../../components/content/Content';

interface ProfilePageProps {
  
}

const ProfilePage: FC<ProfilePageProps> = ({  }) => {
    
  return (
    <div className='ml-72 w-2/3' >
     <HeadProfile />
     <Content curPage='profile' />
    </div>
  )
}

export default ProfilePage;