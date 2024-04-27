import Body from "./Components/Body";
import {Toaster} from "react-hot-toast";
import MovieDialog from "./Components/MovieDialog";

function App() {
    console.log(process.env.AUTH)
  return (
    <div>
      <Body/>
      <Toaster/>
      <MovieDialog/>
    </div>
  );
}

export default App;
