
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Agent {
  id: string;
  name: string;
  description: string;
}

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
}

const AgentSelector = ({ agents, selectedAgent, onSelectAgent }: AgentSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {selectedAgent?.name || "Select an agent"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        {agents.map((agent) => (
          <DropdownMenuItem
            key={agent.id}
            className="flex items-center justify-between"
            onClick={() => onSelectAgent(agent)}
          >
            <div>
              <div>{agent.name}</div>
              <div className="text-xs text-muted-foreground truncate max-w-40">
                {agent.description}
              </div>
            </div>
            {selectedAgent?.id === agent.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AgentSelector;
