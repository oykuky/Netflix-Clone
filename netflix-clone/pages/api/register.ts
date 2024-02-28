import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST') {   // Sadece POST isteklerine izin ver, aksi takdirde "Method Not Allowed" (405) hatası döndür
        return res.status(405).end();
    }
    try{
        // Gelen isteğin içinden email, name ve password parametrelerini çek
        const { email, name ,password} = req.body;
        // Veritabanında kullanıcının e-posta adresine sahip olup olmadığını kontrol et
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        })

        // Eğer kullanıcı zaten varsa, hata durumunu işle
        // Bu özel durumda, e-posta adresinin zaten kullanımda olduğunu belirten bir hata mesajı döndürülüyor.
        if(existingUser){
            return res.status(422).json({error: 'Email taken'})
        }
        // Eğer kullanıcı yoksa, şifreyi hashle ve yeni bir kullanıcı oluştur
        //await kullanılarak işlemin tamamlanması beklenir.
        const hashedPassword = await bcrypt.hash(password,12);
        // Veritabanında yeni bir kullanıcı oluştur
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        })
      return res.status(200).json(user);
    } catch(error){
        console.log(error);
        return res.status(400).end();
    }
}