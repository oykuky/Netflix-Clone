import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from '@/lib/prismadb';
//import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { getSession } from "next-auth/react";

const serverAuth = async (req:NextApiRequest) => {
    const session = await getSession({req});

    if (!session?.user?.email) {
        throw new Error('Not signed in');
      }
    
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


