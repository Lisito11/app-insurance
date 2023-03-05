import { Navbar } from '../components/Navbar';


type Props = {
  children: string | JSX.Element | JSX.Element[] 
}

export const AppLayout = ({children}: Props) => {
  return (
    <div className="" >

        <Navbar />

        <main className='m-5'>
            { children } 
        </main>

    </div>
  )
}