import {BrowserRouter, Routes, Route} from 'react-router'
import  Login from './features/auth/pages/Login'
import  Register from './features/auth/pages/Register'
import FaceExpression from './features/expression/components/FaceExpression'
import Navbar from './features/components/Nav'
import Home from './features/expression/components/Home'
import Protected from './features/auth/components/Protected'
function AppRoutes(){
    return(
        <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/detect-face' element={<Protected><FaceExpression /></Protected>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;