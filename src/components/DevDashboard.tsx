
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
      <div className="container mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{selectedAgent.name}</h1>
            <p className="text-muted-foreground">{selectedAgent.description}</p>
          </div>
          <Button onClick={handleBackToDashboard} variant="outline">
            Back to Dashboard
          </Button>
        </div>
        
        <div className="bg-muted/20 p-6 rounded-lg">
          <h2 className="text-xl font-medium mb-4">Agent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">ID:</span> {selectedAgent.id}</p>
              <p><span className="font-medium">Status:</span> {selectedAgent.status}</p>
              <p><span className="font-medium">Created:</span> {selectedAgent.createdAt}</p>
            </div>
            <div>
              <p><span className="font-medium">Usage:</span> {selectedAgent.usage} interactions</p>
              <p><span className="font-medium">Version:</span> {selectedAgent.version || 'N/A'}</p>
              <p><span className="font-medium">Author:</span> {selectedAgent.author || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgentUploader onAgentAdded={agent => {
            // In a real app, this would update the agent
            toast.success("Agent files updated successfully");
          }} />
          
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Edit Agent Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="agent-name" className="block text-sm font-medium mb-1">Agent Name</label>
                <input 
                  id="agent-name" 
                  defaultValue={selectedAgent.name}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="agent-desc" className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  id="agent-desc" 
                  defaultValue={selectedAgent.description}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <Button className="mt-2">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
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
