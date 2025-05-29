import { FC } from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Content from '../../components/content/Content';
import Trending from '../../components/trending/Trending';

interface HomeProps {
  
}

const Home: FC<HomeProps> = ({ }) => {
  return (
    <div className='bg-gray-100 flex p-4  '>
     <Sidebar curPage='home'/>
     <Content curPage='home' />
     <Trending />
    </div>
  )
}

export default Home;

// alright it's time to upload the profile img and the cover img 
// so the first thing once you choose a file you wnna show it to the user 
// and show the x icon to delete it 
// same goas with the cover 
// each user has a list of posts 
// 