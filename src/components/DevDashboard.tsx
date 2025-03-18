
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import AgentsList from './dev/AgentsList';
import AgentUploader from './dev/AgentUploader';
import DevMetrics from './dev/DevMetrics';
import AnalyticsCharts from './dev/AnalyticsCharts';
import { Agent } from './types/Agent';

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

const DevDashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const addNewAgent = (newAgent: Agent) => {
    setAgents([...agents, newAgent]);
  };

  const totalUsage = agents.reduce((sum, agent) => sum + agent.usage, 0);
  const activeAgents = agents.filter(agent => agent.status === 'active').length;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Developer Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button className="flex items-center gap-2">
          <UploadCloud className="h-4 w-4" />
          Create New Agent
        </Button>
      </div>
      
      <DevMetrics 
        totalUsage={totalUsage}
        activeAgents={activeAgents}
        totalAgents={agents.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsCharts />
        <AgentUploader onAgentAdded={addNewAgent} />
      </div>
      
      <AgentsList agents={agents} />
    </div>
  );
};

export default DevDashboard;
