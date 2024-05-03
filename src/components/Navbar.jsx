import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


async function Navbar() {

    const session = await getServerSession(authOptions);
    console.log(session);

    return(
        <div className='custom-bg'>
        <div>
          <h1 className='px-3 py-1 text-white font-bold text-center text-2xl'>GestionaTec</h1>
        </div>
        
        {/* Navegación */}
        <nav className='mt-5 py-5 flex justify-between'>
          
            {
                !session?.user ? (
                    <>
                        <ul className='px-3 flex'>
                        <li className='mr-4 text-white'>
                            <Link href={'/'}>Inicio</Link>
                            </li>
                            <li className='mr-4 text-white'>
                            <Link href={'#'}>Ver Eventos</Link>
                            </li>
                        </ul>

                        <ul className='flex px-3'>
                            <li className='ml-4 text-white'>
                            <Link href={'/auth/login'}>Login</Link>
                            </li>
                            <li className='ml-4 text-white'>
                            <Link href={'/auth/register'}>Register</Link>
                            </li>
                        </ul>
                    </>
                )  :  (
                    <>
                        <li className='ml-4 text-white'>
                            <Link href="/auth/agregarEventos">Agregar Eventos</Link>
                        </li>
                        <li className='ml-4 text-white'>
                            <Link href="/auth/verEventos">Ver Eventos</Link>
                        </li  >
                        <li className='ml-4 text-white'>
                            <Link href="/auth/modificarEvento">modificar Eventos</Link>
                        </li  >
                        <li className='ml-4 text-white'>
                            <Link href="/api/auth/signout">Logout</Link>
                        </li>
                     
                    </>
                )
            }
         
        </nav>
      </div>
    )
}
export default Navbar





