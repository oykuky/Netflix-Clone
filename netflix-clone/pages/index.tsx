import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useMovieList from '@/hooks/useMovieList';
import { NextPageContext } from 'next';
import {getSession, signOut} from 'next-auth/react'

// getSession kullanıcının oturum bilgilerini alır,
// signOut ise kullanıcıyı uygulamadan çıkarır.
//Bu fonksiyon, sayfanın her sunucu tarafı renderı öncesinde çalıştırılır
export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);
  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const {data: movies = [] } = useMovieList();
  return (
   <>
    <Navbar/>
    <Billboard/>
    <div className='pb-40'>
     <MovieList title='Trending Now' data ={movies}/>
    </div>
   </>
  );
}

//getServerSideProps fonksiyonu ile sayfaya girişi korumalı hale getirir. 
//Eğer kullanıcı oturum açmamışsa, /auth sayfasına yönlendirilir. 
//Oturum açmış kullanıcılar ise sayfayı görüntüleyebilir ve çıkış düğmesiyle oturumu kapatabilir.