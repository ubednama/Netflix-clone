import Body from "./Components/Body";
import {Toaster} from "react-hot-toast";
import MovieDialog from "./Components/MovieDialog";

function App() {
  return (
    <div>
      <Body/>
      <Toaster/>
      <MovieDialog/>
    </div>
  );
}

export default App;
