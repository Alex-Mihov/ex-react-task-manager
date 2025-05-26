import { GlobalProvider } from './GlobalContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
