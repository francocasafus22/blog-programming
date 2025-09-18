import { useState } from "react";
import {
  Menu,
  X,
  PenSquare,
  User,
  Notebook,
  Home,
  Search,
  Bell,
} from "lucide-react";
import LinkWithIcon from "./ui/LinkWithIcon";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const links = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Explorar", href: "/explore", icon: Search },
    { name: "Crear", href: "/createPost", icon: User },
    { name: "Notificaciones", href: "/notifications", icon: Bell },
  ];

  const linksUser = [
    { name: "Mi Perfil", href: "/explore", icon: User },
    { name: "Crear Post", href: "/", icon: PenSquare },
    { name: "Mis Posts", href: "/following", icon: Notebook },
  ];

  return (
    <nav className="bg-background border-b border-border sticky w-full z-50 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/bloglogo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold ">MiBlog</span>
          </div>

          {/* Links en escritorio */}
          <div className="hidden md:flex gap-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={classNames(
                  location.pathname === link.href
                    ? "bg-accent text-accent-foreground py-2 px-5 rounded-lg transition"
                    : " hover:bg-accent hover:text-accent-foreground py-2 px-5 rounded-lg transition"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {/* Toggle menú mobile */}
            <div className="md:hidden relative flex ">
              <button
                className="text-foreground z-50 relative"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={28} /> : <Menu size={28} />}
              </button>

              {/* Menu desplegable */}
              <div
                className={`fixed top-16 left-2 right-2 bg-white/10 backdrop-blur-md shadow-lg border border-border rounded-lg p-4 transition-all duration-300 ease-in-out ${
                  open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {links.map((link) => (
                  <LinkWithIcon
                    href={link.href}
                    name={link.name}
                    icon={link.icon}
                  ></LinkWithIcon>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src="../../iconPerrito.jpg"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer border border-border"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {linksUser.map((link) => (
                  <DropdownMenuItem key={link.name} className="py-0">
                    <LinkWithIcon
                      name={link.name}
                      href={link.href}
                      icon={link.icon}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
