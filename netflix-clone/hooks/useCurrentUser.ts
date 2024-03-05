import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//oturum açmış kullanıcının bilgilerini almak için kullanılabilecek bir useSWR kancası kullanılır
const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current',fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
}


export default useCurrentUser;