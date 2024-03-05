import axios from 'axios'

const fetcher = (url:string) => axios.get(url).then((res) => res.data);
export default fetcher;

//axios kütüphanesini kullanarak bu URL'yi GET isteği yaparak verileri çeken bir fonksiyondur