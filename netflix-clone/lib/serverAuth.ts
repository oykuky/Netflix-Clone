import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from '@/lib/prismadb';
//import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { getSession } from "next-auth/react";

//Next.js API tarafından çağrılacak ve kullanıcının oturumunu kontrol edecek
const serverAuth = async (req:NextApiRequest) => {
    // Oturumu al, eğer oturum yoksa veya kullanıcının e-posta bilgisi yoksa hata fırlat.
    const session = await getSession({req});

    if (!session?.user?.email) {
        throw new Error('Not signed in');
      }
    // Oturumu kullanarak veritabanından kullanıcıyı bul. Kullanıcı yoksa hata fırlat.
      const currentUser = await prismadb.user.findUnique({
        where: {
          email: session.user.email,
        }
      });
      
      if (!currentUser) {
        throw new Error('Not signed in');
      }
    
      return { currentUser };
    }
    
    export default serverAuth;


