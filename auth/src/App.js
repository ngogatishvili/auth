import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ForgetPass from "./components/screens/ForgetPass";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ResetPass from "./components/screens/ResetPass";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/screens/Home";

const App=()=> {
  return (
    <Router>
       <div className="App">
        <Routes>
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/forgot" element={<ForgetPass/>}/>
          <Route path="/passwordreset" element={<ResetPass/>}/>
        </Routes>
     </div>
    </Router>
   
  );
}

export default App;
