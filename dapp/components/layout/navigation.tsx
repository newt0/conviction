"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "Marketplace", href: "/marketplace" },
  { name: "Compare", href: "/compare" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userHandle] = useState("@kyohei_nft");

  const pathname = usePathname();

  const showUserInfo = ["/mint", "/dashboard", "/profile", "/compare"].some(
    (prefix) => pathname.startsWith(prefix)
  );

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  const NavItems = ({
    mobile = false,
    onItemClick,
  }: {
    mobile?: boolean;
    onItemClick?: () => void;
  }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onItemClick}
          className={`${
            mobile ? "block px-3 py-2 text-base" : "text-sm"
          } font-medium transition-colors hover:text-[#4DA2FF] ${
            isActive(item.href) ? "text-[#4DA2FF]" : "text-[#030F1C]"
          }`}
        >
          {item.name}
        </Link>
      ))}
      <Link href="/mint" onClick={onItemClick}>
        <Button
          className={`${
            mobile ? "w-full mt-2" : ""
          } bg-[#4DA2FF] hover:bg-[#3d8ae6] text-white font-medium`}
        >
          Mint
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#011829] rounded-lg flex items-center justify-center">
              <img
                src="convictionfi_icon.png"
                alt="ConvictionFi Logo"
                className="h-6 w-6"
              />
            </div>
            <span className="text-[#011829] font-bold text-xl">
              ConvictionFi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItems />
          </div>

          {/* Desktop User Info */}
          <div className="hidden md:flex items-center space-x-4">
            {showUserInfo &&
              (isConnected ? (
                <div className="flex items-center space-x-2 text-[#030F1C]">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{userHandle}</span>
                </div>
              ) : (
                <Button
                  onClick={() => setIsConnected(true)}
                  variant="outline"
                  className="border-[#4DA2FF] text-[#4DA2FF] hover:bg-[#4DA2FF] hover:text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-4 space-y-4">
                  {showUserInfo && isConnected && (
                    <div className="flex items-center space-x-2 text-[#030F1C] pb-4 border-b border-gray-200">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{userHandle}</span>
                    </div>
                  )}
                  <NavItems mobile onItemClick={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
