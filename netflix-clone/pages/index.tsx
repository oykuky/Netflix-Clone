import useCurrentUser from '@/hooks/useCurrentUser';
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
  const { data: user } = useCurrentUser();
  return (
   <>
   <h1 className="text-red-500 text-3xl">Netflix Clone</h1>
   <p className='text-white'>Logged in as : {user?.email} </p>
   <button className='h-10 w-full bg-white ' onClick={() => signOut()}>Logout!</button>
   </>
  );
}

//getServerSideProps fonksiyonu ile sayfaya girişi korumalı hale getirir. 
//Eğer kullanıcı oturum açmamışsa, /auth sayfasına yönlendirilir. 
//Oturum açmış kullanıcılar ise sayfayı görüntüleyebilir ve çıkış düğmesiyle oturumu kapatabilir.