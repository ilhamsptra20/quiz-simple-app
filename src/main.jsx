import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'
import { IconContext } from 'react-icons';


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
            {/* <Testing /> */}
            <App/>
            {/* <Progres/> */}
        </IconContext.Provider>
  </StrictMode>,
)
