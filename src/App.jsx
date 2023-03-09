
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
 
  const { logged } = useSelector((state) => state.user)

  return (
    <div className="App text-white font-roboto min-h-screen">


      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"

        />

        {logged && <Navbar />}


        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Homepage />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
