import React, { useState, useEffect } from 'react';
import api from './services/api'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {

  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data])
  }

  async function handleRemoveDev(id) {
    const {data} = await api.delete(`/devs/${id}`)
    setDevs(devs.filter(dev => dev._id !== data._id))
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((dev, index) => ( 
            <DevItem dev={dev} key={index} onRemove={handleRemoveDev} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
