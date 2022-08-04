import Head from 'next/head';
import { Header } from './Header';

export function Layout ( { children } ) {

    return(
        <>
            <Head>
                <title> Node Send Files </title>
                <link href="https://fonts.googleapis.com"/>
                <link href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap"/>
            </Head>

            <div className='min-h-screen font-Rubik font-light'>
                <div className='container mx-auto'>
                    
                    <Header/>

                    <main className='mt-20'>
                        { children }
                    </main>

                </div>
            </div>

            
        </>
    )
}