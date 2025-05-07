import "./App.css";
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";
import Home from "./module/home/home";
import { Routes, Route } from "react-router-dom";
import Anime from "./module/anime/anime";

function App() {
    return (
        <div className="App">
            {/* <Header /> */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/anime/:id" element={<Anime />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
