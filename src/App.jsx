import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [hotels, setHotels] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('/api/hotels')
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }
        const data = await res.json()
        setHotels(data)
      } catch (e) {
        setError(e.message)
      }
    }
    fetchHotels()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Hotel Booking</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!error && hotels.length === 0 && <div>Loading hotels...</div>}
      <ul>
        {hotels.map((h) => (
          <li key={h.id}>
            <strong>{h.name}</strong> — {h.city}, {h.country}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
