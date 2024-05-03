

import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

// pages/api/eventos/[id].js


export async function PUT(request) {
  try {
    const { id } = request.query; // Obtener el ID del evento de la URL
    const eventData = await request.json();

    // Verificar si el evento existe
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingEvent) {
      return {
        status: 404,
        body: { message: "El evento no existe." },
      };
    }

    // Actualizar el evento
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: eventData.name,
        date: new Date(eventData.date),
        location: eventData.location,
        type: eventData.type,
        descripcion: eventData.descripcion,
      },
    });

    return {
      status: 200,
      body: updatedEvent,
    };
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    return {
      status: 500,
      body: { message: "Ha ocurrido un error al actualizar el evento." },
    };
  }
}
