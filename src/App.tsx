import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import WhoAmI from "./pages/WhoAmI"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoami" element={<WhoAmI />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
