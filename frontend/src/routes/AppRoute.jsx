import {Routes,Route} from "react-router-dom"
import Signup from "../components/SignUp"
import Login from "../components/Login"
const AppRoute = () =>{
  return(
 <Routes>
  <Route path="/sign-up" element={<Signup/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
 </Routes>
  )
}
export default AppRoute