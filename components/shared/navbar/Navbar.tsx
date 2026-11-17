import Image from "next/image";
import DarkLogo from '@/app/assets/dark-logo.png'
import LightLogo from '@/app/assets/light-logo.png'
import ThemeToggle from "./ThemeToggle";


const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Equipment", href: "/equipment" },
    // { label: "Login", href: "/login" },
    // { label: "Register", href: "/register" },
]

const Navbar = () => {
    return (
        <nav>
            <div className="flex items-center justify-between max-w-6xl mx-auto px-1 sm:px-2 ">
                <div>
                    <Image
                        src={DarkLogo}
                        alt="EquipRent" width={200}
                        height={100}
                        priority
                        className="hidden dark:block"></Image>
                    <Image
                        src={LightLogo}
                        alt="EquipRent"
                        width={200} height={100}
                        priority
                        className=" dark:hidden"></Image>
                </div>
                <div className="flex items-center justify-end gap-5">

                    <div className="hidden sm:flex items-center gap-5">
                        {
                            navLinks.map((nav) => <ul key={nav.href} >
                                <li>{nav.label}</li>
                            </ul>)
                        }
                    </div>
                    <div className="flex items-center justify-center gap-3 sm:gap-5">
                        <ThemeToggle />
                        <button>Log in</button>
                        <button>Register</button>
                    </div>


                </div>
            </div>
        </nav>
    );
};

export default Navbar;