// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Cabecalho, Rodape } from './Componentes'
import { PgInicial } from './Paginas'
import { Router } from './Router'


function App() {
  return (
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
  )
}

export default App
