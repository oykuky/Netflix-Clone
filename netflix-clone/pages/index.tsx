import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useFavorites from '@/hooks/useFavorites';
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
  const {data: favorites = [] } = useFavorites();
  return (
   <>
    <Navbar/>
    <Billboard/>
    <div className='pb-40'>
     <MovieList title='Trending Now' data ={movies}/>
     <MovieList title='My List' data ={favorites}/>
    </div>
   </>
  );
}

//getServerSideProps fonksiyonu ile sayfaya girişi korumalı hale getirir. 
//Eğer kullanıcı oturum açmamışsa, /auth sayfasına yönlendirilir. 
//Oturum açmış kullanıcılar ise sayfayı görüntüleyebilir ve çıkış düğmesiyle oturumu kapatabilir.