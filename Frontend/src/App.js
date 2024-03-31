import './App.css';
import { Routes , Route } from 'react-router-dom';
import SignInComponent from './Components/AccountComponents/SignInComponent';
import ProfileComponent from './Components/AccountComponents/ProfileComponent';
import DashboardAdmin from './Components/AdmindashboardComponents/DashboardAdmin';
import ListUsers from './Components/AdmindashboardComponents/ListUsers';
import AddNewUser from './Components/AdmindashboardComponents/AddnewUser';
import SignUpComponent from './Components/AccountComponents/SignUpComponent';
import TwoFactor from './Components/AccountComponents/TwoFactor';
import EmailConfirmation from './Components/AccountComponents/EmailConfirmation';
import ListPasswords from './Components/UserComponents/ListPasswords';
import AddNewPassword from './Components/UserComponents/AddNewPassword';
import AddNewPasswordAdmin from './Components/AdmindashboardComponents/AddNewPasswordAdmin';
import ListPass from './Components/AdmindashboardComponents/ListPass';
import UpdatePass from './Components/AdmindashboardComponents/UpdatePass';
import UpdatePassword from './Components/UserComponents/UpdatePassword';
import PasswordsDetails from './Components/AdmindashboardComponents/PasswordsDetails';
import UpdatePasss from './Components/AdmindashboardComponents/UpdatePasss';


function App() {
  return (
    <>
   <Routes>
   <Route path='' element={<SignInComponent></SignInComponent>}></Route>
   <Route path='/signIn' element={<SignInComponent></SignInComponent>}></Route>
   <Route path='/signUp' element={<SignUpComponent></SignUpComponent>}></Route>
   <Route path='/profile' element={<ProfileComponent></ProfileComponent>}></Route>
   <Route path='/TwoFactor' element={<TwoFactor></TwoFactor>}></Route>
   <Route path='/EmailConfirmation' element={<EmailConfirmation></EmailConfirmation>}></Route>
   <Route path='/UpdatePass/:passId' element={<UpdatePass></UpdatePass>}></Route>

   {/* Routes dashboard User */}
   <Route path='/ListPasswords' element={<ListPasswords></ListPasswords>}></Route>
   <Route path='/AddNewPassword' element={<AddNewPassword></AddNewPassword>}></Route>
   <Route path='/ListPass' element={<ListPass></ListPass>}></Route>
   <Route path='/UpdatePassword/:passId' element={<UpdatePassword></UpdatePassword>}></Route>


   {/* Routes dashboard Admin */}
   <Route path='/DashboardAdmin' element={<DashboardAdmin></DashboardAdmin>}></Route>
   <Route path='/AddNewPasswordAdmin' element={<AddNewPasswordAdmin></AddNewPasswordAdmin>}></Route>
   <Route path='/ListUsers' element={<ListUsers></ListUsers>}></Route>
   {/* <Route path='/listDoctors' element={<ListDoctors></ListDoctors>}></Route> */}
   <Route path='/AddnewUser' element={<AddNewUser></AddNewUser>}></Route>
   <Route path='/PasswordsDetails/:userrId' element={<PasswordsDetails></PasswordsDetails>}></Route>
   <Route path='/UpdatePasss/:passId' element={<UpdatePasss></UpdatePasss>}></Route>
   <Route path='*' element={<SignInComponent></SignInComponent>}></Route>


   </Routes>
   </>  
  );
}

export default App;
