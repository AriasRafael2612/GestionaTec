
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

console.log('entrando')

export async function DELETE(request) {
   
    try {
        console.log('aqui')
        // Obtener el ID del evento a eliminar desde el cuerpo de la solicitud
        const eventId = request.body.id_evento;

        console.log(eventId)
       
        // Verificar si el eventId está definido y no es nulo
        if (!eventId) {
            return NextResponse.json({ message: "Se requiere un ID de evento válido." }, { status: 400 });
        }

        // Verificar si el evento existe
        const existingEvent = await prisma.event.findUnique({
            where: {
                id_evento: parseInt(eventId) // Parseamos el eventId a entero si es necesario
            }
        });

        // Si el evento no existe, retornar un error 404
        if (!existingEvent) {
            return NextResponse.json({ message: "El evento no existe." }, { status: 404 });
        }

        // Eliminar el evento de la base de datos
        await prisma.event.delete({
            where: {
                id_evento: parseInt(eventId) // Parseamos el eventId a entero si es necesario
            }
        });

        // Devolver una respuesta exitosa
        return NextResponse.json({ message: "El evento ha sido eliminado correctamente." }, { status: 200 });
    } catch (error) {
        // Capturar errores y manejarlos adecuadamente
        console.error('Error al eliminar el evento:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al eliminar el evento." }, { status: 500 });
    }
}
