
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Agent } from '../../types/Agent';

interface AgentHeaderProps {
  agent: Agent;
  onBack: () => void;
}

const AgentHeader: React.FC<AgentHeaderProps> = ({ agent, onBack }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onBack}
        className="h-9 w-9 shadow-sm hover:shadow transition-all border-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h2 className="text-2xl font-semibold">{agent.name}</h2>
        <p className="text-muted-foreground">{agent.description}</p>
      </div>
      
      <div className="ml-auto flex items-center gap-2">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          agent.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
          agent.status === 'inactive' ? 'bg-slate-100 text-slate-800' :
          agent.status === 'disabled' ? 'bg-red-100 text-red-800' :
          'bg-amber-100 text-amber-800'
        }`}>
          {agent.status}
        </span>
      </div>
    </div>
  );
};

export default AgentHeader;
