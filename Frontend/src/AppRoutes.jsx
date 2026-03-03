import {BrowserRouter, Routes, Route} from 'react-router'
import  Login from './features/auth/pages/Login'
import  Register from './features/auth/pages/Register'
import FaceExpression from './features/expression/components/FaceExpression'
function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/detect-face' element={<FaceExpression />}/>
            
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;