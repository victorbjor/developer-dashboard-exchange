
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart3, Code2, MessageSquare, UserRound } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-medium">AgentHub</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/developers" 
            className={`flex items-center gap-2 py-1 px-2 rounded-md transition-colors ${
              location.pathname === '/developers' 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>For Developers</span>
          </Link>
          <Link 
            to="/users" 
            className={`flex items-center gap-2 py-1 px-2 rounded-md transition-colors ${
              location.pathname === '/users' 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>For Users</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <UserRound className="h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" className="hidden md:inline-flex">Get Started</Button>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
