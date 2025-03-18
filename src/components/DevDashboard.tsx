import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import AgentsList from './dev/AgentsList';
import DevMetrics from './dev/DevMetrics';
import AnalyticsCharts from './dev/AnalyticsCharts';
import AgentCreator from './dev/AgentCreator';
import { Agent } from './types/Agent';
import AgentUploader from './dev/AgentUploader';
import { toast } from "sonner";
import AgentDetails from './dev/AgentDetails';

// Mock data
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries and support requests',
    usage: 876,
    createdAt: '2023-10-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Product Recommendation Agent',
    description: 'Suggests products based on user preferences',
    usage: 543,
    createdAt: '2023-11-02',
    status: 'active'
  },
  {
    id: '3',
    name: 'Data Analysis Assistant',
    description: 'Helps analyze and visualize complex data',
    usage: 321,
    createdAt: '2023-12-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'New Marketing Agent',
    description: 'Drafts marketing content and campaigns',
    usage: 0,
    createdAt: '2024-01-05',
    status: 'pending'
  },
  {
    id: '5',
    name: 'Customer Feedback Agent',
    description: 'Collects and analyzes customer sentiment',
    usage: 128,
    createdAt: '2024-02-15',
    status: 'disabled'
  }
];

type ViewState = 'dashboard' | 'agent-details' | 'create-agent';

const DevDashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const addNewAgent = (newAgent: Agent) => {
    setAgents([...agents, newAgent]);
    setCurrentView('dashboard');
    toast.success("New agent created successfully");
  };
  
  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setCurrentView('agent-details');
  };
  
  const handleCreateAgentClick = () => {
    setCurrentView('create-agent');
  };
  
  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedAgent(null);
  };

  const totalUsage = agents.reduce((sum, agent) => sum + agent.usage, 0);
  const activeAgents = agents.filter(agent => agent.status === 'active').length;

  if (currentView === 'create-agent') {
    return (
      <AgentCreator 
        onBack={handleBackToDashboard}
        onAgentCreated={addNewAgent}
      />
    );
  }
  
  if (currentView === 'agent-details' && selectedAgent) {
    return (
      <AgentDetails 
        agent={selectedAgent}
        onBack={handleBackToDashboard}
        onUpdate={(updatedAgent) => {
          setAgents(agents.map(agent => 
            agent.id === updatedAgent.id ? updatedAgent : agent
          ));
          setSelectedAgent(updatedAgent);
          toast.success("Agent updated successfully");
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Developer Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={handleCreateAgentClick}
        >
          <UploadCloud className="h-4 w-4" />
          Create New Agent
        </Button>
      </div>
      
      <DevMetrics 
        totalUsage={totalUsage}
        activeAgents={activeAgents}
        totalAgents={agents.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsCharts />
      </div>
      
      <AgentsList 
        agents={agents} 
        onSelectAgent={handleSelectAgent} 
      />
    </div>
  );
};

export default DevDashboard;
