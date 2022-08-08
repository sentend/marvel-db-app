import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app/App'

import './style/style.scss'

document.body.classList.add('fade')

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
