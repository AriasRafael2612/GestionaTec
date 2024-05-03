
// Archivo: pages/api/auth/registerParticipant.js

import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
    try {
      
      console.log('hsijsij')
        const participantData = await request.json();

        // Validar los datos
        if (!participantData.name || !participantData.email || !participantData.age || !participantData.phone || !participantData.eventId) {
            return NextResponse.json({ message: "Falta información para registrar el participante." }, { status: 400 });
        }
  
        // Guardar el participante en la tabla participant
        const newParticipant = await prisma.participant.create({
            data: {
                name: participantData.name,
                email: participantData.email,
                age: participantData.age,
                phone: participantData.phone
            },
        });

        return NextResponse.json(newParticipant); // Devuelve el participante creado
    } catch (error) {
        console.error('Error al registrar participanteeeeeeeeee:', error);
        return NextResponse.json({ message: "Ha ocurrido un error al registrar el participante." }, { status: 500 });
    }
}
