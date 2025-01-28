
import { BrowserRouter, Routes,Route } from "react-router-dom"
import Page from "./Main/Page"
import Register from "./Forms/Register"
import Login from "./Forms/Login"
import ForgotPassword from "./Forms/Forgot"
import ResetPassword from "./Forms/Reset"
import Logout from "./Forms/Logout"
import Protected from "./Protected/protected"
import Main from "./Project/Main"
import Unique from "./Project/Unique"
import Ai from "./Project/Ai"
function App() {
  return (

   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Page/>}></Route>
    <Route path="/api/register" element={<Register/>}></Route>
    <Route path="/api/login" element={<Login/>}></Route>
    <Route path="/api/logout" element={<Logout/>}></Route>
    <Route path="/api/forgot-password" element={<ForgotPassword/>}></Route>
    <Route path="/api/reset-password/:token" element={<ResetPassword/>}></Route>
    <Route path="/project" element={<Protected Component={Main}/>}></Route>
    <Route path="/projects/:projectId" element={<Protected Component={Unique}/>}></Route>
    <Route path="/chat/:projectId" element={<Protected Component={Ai}/>}></Route>
   </Routes>
   </BrowserRouter>
        
     

  )
}

export default App
