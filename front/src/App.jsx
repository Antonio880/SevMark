import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useUserContext } from './components/ContextUser';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
 
  const { user } = useUserContext();
  return (
    <Routes>
      <Route path='/home' element={user ? <Home /> : <SignIn />}/>
      <Route path='/' element={<SignIn />}/>
      <Route path='*' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
    </Routes>
  )
}

export default App;
