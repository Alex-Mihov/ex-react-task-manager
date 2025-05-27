import { GlobalProvider } from './GlobalContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import TaskDetail from './pages/TaskDetail'

// Importazione dei componenti per le notifiche toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* Configurazione del container per le notifiche toast */}
      <ToastContainer
        position="top-center"       // Posizione del toast sullo schermo
        autoClose={5000}           // Chiusura automatica dopo 5 secondi
        hideProgressBar={false}    // Mostra la barra di avanzamento
        newestOnTop={false}       // I nuovi toast appaiono in basso
        closeOnClick={false}      // Non si chiude al click
        rtl={false}              // Layout da sinistra a destra
        pauseOnFocusLoss         // Pausa quando si perde il focus
        draggable               // Possibilità di trascinare
        pauseOnHover           // Pausa al passaggio del mouse
        theme="light"         // Tema chiaro
      />

      {/* Provider del contesto globale dell'applicazione */}
      <GlobalProvider>
        {/* Configurazione del router */}
        <BrowserRouter>
          <div className="container">
            {/* Barra di navigazione */}
            <Navbar />
            {/* Definizione delle rotte dell'applicazione */}
            <Routes>
              <Route path="/" element={<TaskList />} />          {/* Pagina principale con lista task */}
              <Route path="/add" element={<AddTask />} />        {/* Pagina per aggiungere task */}
              <Route path="/task/:id" element={<TaskDetail />} /> {/* Pagina dettaglio singolo task */}
            </Routes>
          </div>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
