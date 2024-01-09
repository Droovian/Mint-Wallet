import { Route, Router,  Routes, Link } from "react-router-dom"
import Auth from "./pages/Auth"
import Expense from "./Tracker/Expense"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Auth/>}/>
        <Route path="/expense-tracker" exact element={<Expense/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
