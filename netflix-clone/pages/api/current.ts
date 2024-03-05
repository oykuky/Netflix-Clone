import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Sadece GET isteklerini kabul et, diğer türdeki isteklere "Method Not Allowed" (405) hatası döndür.
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    // serverAuth fonksiyonunu çağırarak kullanıcının oturumunu kontrol et ve currentUser bilgisini al.
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}