import { Route, Routes } from "react-router-dom";
import React from "react"
import Home from "./components/Home"
import Form from "./components/form"
import Detail from "./components/detail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/:id" element={<Detail/>}/>
      </Routes>
      </div>
  )
}

export default App;
