// EventList.jsx
'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/auth/devolverEventos');
        if (!response.ok) {
          throw new Error('Error al obtener los eventos');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (eventTypeFilter === '' || event.type.toLowerCase() === eventTypeFilter.toLowerCase())
  );

  const sortedEvents = filteredEvents.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleEventTypeChange = event => {
    setEventTypeFilter(event.target.value);
  };

  const handleSortOrderChange = event => {
    setSortOrder(event.target.value);
  };

  const deleteEvent = async (eventId) => {
    // Código para eliminar el evento...
  };

  const registerForEvent = async (eventId) => {
    console.log('registrarse')
    localStorage.setItem('eventId', eventId);
    
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      backgroundColor: '#f0f6fc',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <h1 style={{ 
        color: '#007bff', 
        textAlign: 'center',
        fontSize: '36px',
      }}>Lista de Eventos</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Buscar evento por nombre..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          style={{ 
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        />
        <select 
          value={eventTypeFilter} 
          onChange={handleEventTypeChange}
          style={{ 
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
        >
          <option value="">Todos los tipos</option>
          <option value="individual">Individual</option>
          <option value="equipo">Equipo</option>
        </select>
        <select 
          value={sortOrder} 
          onChange={handleSortOrderChange}
          style={{ 
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>
      <ul style={{ 
        listStyleType: 'none', 
        padding: '0',
        margin: '0 auto',
      }}>
        {sortedEvents.map(event => (
          <li key={event.id_evento} style={{ 
            backgroundColor: '#fff', 
            marginBottom: '20px', 
            padding: '15px', 
            borderRadius: '5px', 
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' 
          }}> 
            <h2 style={{ color: '#007bff', marginTop: '0' }}>{event.name}</h2>
            <p><strong>Fecha:</strong> {event.date}</p>
            <p><strong>Ubicación:</strong> {event.location}</p>
            <p><strong>Tipo:</strong> {event.type}</p>
            <p><strong>Descripción:</strong> {event.descripcion}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              <Link href="./registrarse">
                <button 
                  onClick={() => registerForEvent(event.id_evento)}
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Registrarse
                </button>
              </Link>


              <Link href={`./modificarEvento?id=${event.id_evento}`} >
                <button 
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Modificar
                </button>
              </Link>
              {/* <button 
                onClick={() => deleteEvent(event.id_evento)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Eliminar
              </button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
