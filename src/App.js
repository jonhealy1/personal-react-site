import "./App.css";
import Bio from "./components/Bio";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Travels from "./components/Travels";

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="pt-16">
        <div id="bio" className="pt-20 -mt-20">
          <Bio />
        </div>
        <div id="photos" className="pt-20 -mt-20">
          <Travels />
        </div>
      </div>
    </div>
  );
}

export default App;
