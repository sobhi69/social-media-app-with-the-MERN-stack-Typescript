import { FC } from 'react'
import Auth from './pages/signIn-signUp/Auth';
import Router from './Routes/Router'
import useAuth from './hooks/useAuth';


interface AppProps {

}

const App: FC<AppProps> = ({ }) => {

  const { curUser } = useAuth()
  return (
    <>
      {!curUser ? <Auth /> : <Router />}
    </>
  )
}

export default App;