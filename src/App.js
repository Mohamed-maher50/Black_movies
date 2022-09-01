import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ShowMovies from "./pages/ShowMovies";
import "./App.css";
import Movies from "./pages/Movies";
import ProfileActor from "./pages/ProfileActor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/movies/:id" element={<Movies />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<ShowMovies />} />
        <Route path="/actor/profile/:id" element={<ProfileActor />} />
      </Routes>
    </div>
  );
}

export default App;
