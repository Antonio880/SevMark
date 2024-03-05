import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useUserContext } from './Context/ContextUser';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateLocationData from './pages/CreateLocationData';
import { useEffect } from 'react';

function App() {
 
  const { user, setUser } = useUserContext();
  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='))
      .split('=')[1];

    const userFromCookie = JSON.parse(decodeURIComponent(cookieValue));

    if(userFromCookie){
      setUser(userFromCookie);
    }
  }, [])
  return (
    <Routes>
      <Route path='/home' element={user ? <Home /> : <SignIn />}/>
      <Route path='/' element={<SignIn />}/>
      <Route path='*' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      <Route path='/create-location' element={user ? <CreateLocationData /> : <SignIn />} />
    </Routes>
  )
}

export default App;
