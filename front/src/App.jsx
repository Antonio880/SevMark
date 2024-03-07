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
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('user='))
        ?.split('=')[1];

      if (cookieValue) {
        const userFromCookie = JSON.parse(decodeURIComponent(cookieValue));
        setUser(userFromCookie);
      }
    } catch (error) {
      // Tratar o erro quando não há nada nos cookies
      console.error('Erro ao processar cookies:', error);
    }
  }, [])
  return (
    <Routes>
      <Route path='/home' element={user ? <Home /> : <SignIn />}/>
      <Route path='/' element={user ? <Home /> : <SignIn />}/>
      <Route path='*' element={user ? <Home /> : <SignIn />}/>
      <Route path='/sign-up' element={user ? <Home /> : <SignUp />}/>
      <Route path='/create-location' element={user ? <CreateLocationData /> : <SignIn />} />
    </Routes>
  )
}

export default App;
