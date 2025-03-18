
import React from 'react';
import { Button } from "@/components/ui/button";

const HelpBanner: React.FC = () => {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl mb-6 shadow-md">
      <img 
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200" 
        alt="Technology Banner" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
        <div className="px-8">
          <h3 className="text-xl font-bold mb-2 text-white dark:text-white">Need Help?</h3>
          <p className="max-w-md text-white/90 dark:text-white/90 text-sm">
            Check our documentation for more information on creating and managing AI agents.
          </p>
          <Button className="mt-4 bg-white text-primary hover:bg-white/90 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpBanner;
