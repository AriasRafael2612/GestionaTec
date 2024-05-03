// Página: pages/registerParticipant.js

'use client'

import { useState } from 'react';   
import {useForm} from "react-hook-form"

export default function RegisterParticipant() {
  const {register,handleSubmit,  formState: {errors}} = useForm();
  const [error, setError] = useState('');
   
  const onSubmit = handleSubmit( async (participantData) => {

    const res = await fetch('/api/auth/registrarParticipante', {
      method: 'POST',
      body: JSON.stringify({
        name: participantData.name,
        email: participantData.email,
        age: participantData.age,
        phone: participantData.phone
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(res.ok){
      console.log('dnjnedj')
    }
  });


  return (
    <div className="min-h-100">
      
      <div  className='flex flex-col mt-10 items-center'>
      <h2 className = "p-3 text-3xl text-center font-bold">Crear Cuenta de Administrador</h2>
        <div className = "-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:mx-8 lg:px-8 w-10/12 md:w-4/12 lg:2-6/12">
          <div  className='py-10 relative shadow overflow-hidden sm:rounded-lg border-b border-gray-200'>
          
            <form className = "bg-white p-3" onSubmit={onSubmit}>
            
            <div className = "mb-4">
                <label htmlFor = "username" className = "block text-black text-sm font-bold mb-2">Name</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" 
                {...register("name", {
                  required:{
                    value: true,
                    message: 'name requerido'
                  }
                })}
                />
                {
                  errors.username &&(
                    <span className = "text-red-500">{errors.username.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "email" className = "block text-black text-sm font-bold mb-2">Email</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="email" 
                {...register("email", {
                  required:{
                    value: true,
                    message: 'email requerido'
                  }
                })}
                />
                {
                  errors.email &&(
                    <span className = "text-red-500">{errors.email.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "password" className = "block text-black text-sm font-bold mb-2">Contraseña</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="age"
                {...register("age", {
                  required:{
                    value: true,
                    message: 'edad requerida'
                  }
                })}           
                />
                {
                  errors.age &&(
                    <span className = "text-red-500">{errors.password.message}</span>
                  )
                }
              </div>

              <div className = "mb-4">
                <label htmlFor = "confirmPassword" className = "block text-black text-sm font-bold mb-2">confirmar telefono</label>
                <input className = "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="phone"
                {...register("phone", {
                  required:{
                    value: true,
                    message: 'confirma tu telefono'
                  }
                })}
                />
               
                </div>
              
              <button className='sm:rounded-lg border-b custom-bg hover:bg-blue-950 w-full mt-5 p-2 text-white uppercase font-bold' type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      </div>
  );
}
