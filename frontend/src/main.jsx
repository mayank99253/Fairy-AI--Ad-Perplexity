
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from './app/app.store'
import './app/index.css'
import App from './app/App'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
