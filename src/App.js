
import './App.css';
import Navbar from "./Components/Navbar";
import Carousel from "./Components/Carousel"
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Navbar/>} >
                <Route index element={<Home/>} />
                <Route path={'login'} element={<Login/>}/>
                <Route path={'signup'} element={<SignUp/>}/>
            </Route>
        </Routes>
      {/*<Navbar/><Carousel/>*/}
    </BrowserRouter>
  );
}

export default App;
