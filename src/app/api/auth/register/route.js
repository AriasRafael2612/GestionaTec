import {NextResponse, userAgentFromString} from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/libs/prisma';

export async function POST(request){
    try{
        const data  =  await request.json();

        const userEmailFound = await prisma.user.findUnique({
            where:{
                email: data.email
            }
        })
    
        const userNameFound = await prisma.user.findUnique({
            where:{
                username: data.username
            }
        })
    
        if(userEmailFound){
            return NextResponse.json({
                message: "Email already exists"
            }, {
                status: 400
            })
        }
    
        if(userNameFound){
            return NextResponse.json({
                message: "User already exists"
            }, {
                status: 400
            })
        }
    
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await prisma.user.create({
            data:{
                username: data.username,
                email: data.email,
                password: hashedPassword,
                role: data.role
            }
        })
    
        const {password: _, ...user} = newUser
    
    
        return NextResponse.json(user)

    }catch(error){
        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        );
    }
}