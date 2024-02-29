import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import {compare} from 'bcrypt';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


//Credentials provider'ı, e-posta ve şifre tabanlı kimlik doğrulama sağlar.
export default NextAuth ({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID || '',
          clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        Credentials ({
            id : 'credentials',
            name : 'Credentials',
            credentials : {
              email: {
                label : 'Email',
                type : 'text',
              },
              password: {
                label: 'Password',
                type : 'password',
              }
            },
            async authorize(credentials) {
              if(!credentials?.email || !credentials?.password){
                throw new Error("Email and password required");
              }
              const user = await prismadb.user.findUnique({
                where:{
                  email: credentials.email  // Veritabanında kullanıcının e-posta adresini arar.
                }
              });

              if(!user || !user.hashedPassword){
                throw new Error("Email does not exist");
              }

              const isCorrectPassword = await compare( // Gelen şifreyi, veritabanındaki hashlenmiş şifre ile karşılaştır
                credentials.password,
                user.hashedPassword
              );

              if(!isCorrectPassword) {
                throw new Error("Incorrect password");
              }

              return user;
            }  
        })
    ],
     // Giriş sayfasını belirt
    pages: {
      signIn: '/auth',
    },
    // Debug modunu belirt (development ortamında aktif)
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session:{
      strategy : 'jwt',  // JSON Web Token (JWT) kullanma stratejisi
    },
    jwt:{
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,

});