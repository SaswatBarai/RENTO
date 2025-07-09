import React from "react";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Profile } from "../components/Profile.jsx"
// import { useEffect } from "react";



const menu = [
  { title: "Home", url: "/" },
  { title: "Rentals", url: "/rentals" },
  { title: "Contact", url: "/contact" },
  { title: "Help", url: "/help" },
];

const auth = {
  login: { title: "Login", url: "/login" },
  signup: { title: "Sign up", url: "/register" },
};

const logo = {
  url: "/",
  title: "Rento",
};

const Navbar1 = () => {
  const hide = useSelector(state => state.navHide.isHide);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuth)
  const user = useSelector(state => state.auth.user);
  const profileUrl = user?.profilePicture || null;

  // console.log('isAuth:', isAuth, 'user:', user, 'profileUrl:', profileUrl)

  return (
    <section className={`py-4 relative bg-gradient-to-r from-[#0a1627] to-[#050e1a] border-b border-[#334155] shadow-lg backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${hide ? "hidden" : "block"}`}>
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex items-center">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-blue-300 transition-all duration-300">
                {logo.title}
              </span>
            </a>
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.url}
                      className="group relative inline-flex h-12 items-center justify-center rounded-xl px-6 py-2 text-md font-semibold text-white hover:text-blue-300 transition-all duration-300 hover:bg-[#101e36]/70 backdrop-blur-sm"
                    >
                      {item.title}
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-3 items-center">
            {
              isAuth && profileUrl ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#101e36] rounded-full border border-blue-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Online</span>
                  </div>
                  <Profile profileUrl={`${profileUrl}`} />
                </div>
              ) :
                (
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm" className="border-2 border-blue-400 text-white hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 rounded-full px-6 font-semibold shadow-md">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105 transition-all duration-300 rounded-full px-6 font-semibold shadow-lg">
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                )
            }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between">
          <a href={logo.url} className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-extrabold text-white">{logo.title}</span>
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-2 border-blue-400 text-white hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-xl shadow-md hover:scale-105">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto bg-gradient-to-br from-[#0a1627] to-[#050e1a] shadow-2xl p-6 w-[85vw] max-w-sm border-l-4 border-blue-500">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <span className="text-xl font-extrabold text-white">{logo.title}</span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-2">
                  {menu.map((item, index) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="group flex items-center gap-3 p-4 rounded-xl text-lg font-semibold text-white hover:bg-[#101e36]/70 hover:text-blue-300 transition-all duration-300 hover:translate-x-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      {item.title}
                    </a>
                  ))}

                  <div>
                    <Select defaultValue="mumbai" className="w-full">
                      <SelectTrigger className="h-10 w-full bg-[#16213a] border-blue-900/30 text-gray-300">
                        <SelectValue placeholder="Select city or airport" />
                      </SelectTrigger>
                      <SelectContent side="bottom" className="bg-[#16213a] text-gray-300 border-blue-900/30">
                        <SelectItem value="bhubaneswar">Bhubaneswar, India</SelectItem>
                        <SelectItem value="delhi">Delhi, India</SelectItem>
                        <SelectItem value="mumbai">Mumbai, India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-4 border-t border-blue-900/50">
                  {isAuth && profileUrl ? (
                    <div className="flex items-center gap-3 p-4 bg-[#101e36] rounded-xl border border-blue-500/30">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-white">You are logged in</span>
                    </div>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="border-2 border-blue-400 text-white hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-xl font-semibold py-6">
                        <a href={auth.login.url}>{auth.login.title}</a>
                      </Button>
                      <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 rounded-xl font-semibold py-6 shadow-lg">
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
