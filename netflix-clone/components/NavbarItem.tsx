import React from 'react'
import { useRouter } from "next/router";


interface NavbarItemProps {
    label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
    const router = useRouter();

    const handleBrowse = () => {
        switch (label) {
            case "Home":
                router.push('/');
                break;
            case "Browse by languages":
                router.push('https://www.languagereactor.com/m/nf_en_-');
                break;
            // Diğer durumlar için gerekli işlemleri ekleyebilirsiniz.
            default:
                break;
        }
    }

    return (
        <div
            onClick={handleBrowse} 
            className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    );
}

export default NavbarItem;
