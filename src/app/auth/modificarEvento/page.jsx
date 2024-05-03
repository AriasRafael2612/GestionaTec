'use client'

import '../../globals.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function ModificarEvento({ id }) {
  const [error, setError] = useState('');
  const [evento, setEvento] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await fetch(`/api/auth/getEvento?id=${id}`);
        if (!res.ok) {
          throw new Error('Error al obtener el evento');
        }
        const data = await res.json();
        setEvento(data);
        setValue('nombre', data.nombre);
        setValue('fecha', data.fecha);
        setValue('ubicacion', data.ubicacion);
        setValue('tipo', data.tipo);
        setValue('descripcion', data.descripcion);
      } catch (error) {
        setError(error.message);
      }
    };
    if (id) {
      fetchEvento();
    }
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch('/api/auth/modificarEvento', {
        method: 'POST',
        body: JSON.stringify({
          id: evento._id,
          name: data.nombre,
          date: data.fecha,
          location: data.ubicacion,
          type: data.tipo,
          descripcion: data.descripcion
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (res.ok) {
        console.log('Evento modificado exitosamente');
      } else {
        throw new Error('Error al modificar el evento');
      }
    } catch (error) {
      setError(error.message);
    }
  });

  if (!evento) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center">Modificar Evento</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-black text-sm font-bold mb-2">Nombre del evento</label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              {...register("nombre", {
                required: {
                  value: true,
                  message: 'Nombre requerido'
                }
              })}
            />
            {errors.nombre && (
              <span className="text-red-500">{errors.nombre.message}</span>
            )}
          </div>
          {/* Otros campos del formulario */}
          <button className='sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold' type="submit">Modificar</button>
        </form>
      </div>
    </div>
  );
}

export default ModificarEvento;
