import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

import Axios from "axios";

function App() {

    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
