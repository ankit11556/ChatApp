import {Routes,Route} from "react-router-dom"
import Signup from "../components/SignUp"
const AppRoute = () =>{
  return(
 <Routes>
  <Route path="/sign-up" element={<Signup/>}></Route>
 </Routes>
  )
}
export default AppRoute