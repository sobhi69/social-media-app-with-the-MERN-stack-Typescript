import { FC } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/notFound/NotFound';
import Settings from '../pages/settings/Settings';

interface RouterProps {

}

const Router: FC<RouterProps> = ({ }) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='*' element={<NotFound /> } />
        </Routes>
    )
}

export default Router;