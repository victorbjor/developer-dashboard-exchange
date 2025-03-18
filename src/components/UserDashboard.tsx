
import React, { useState } from "react";
import ChatDashboard from "./chat/ChatDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Agent } from "./types/Agent";

// Mock agents for selection
const availableAgents: Agent[] = [
  {
    id: "1",
    name: "Customer Support Assistant",
    description: "Get help with your account, orders, and general inquiries",
    usage: 876,
    createdAt: "2023-10-15",
    status: "active"
  },
  {
    id: "2",
    name: "Product Recommendation Agent",
    description: "Find the perfect products based on your preferences",
    usage: 543,
    createdAt: "2023-11-02",
    status: "active"
  },
  {
    id: "3",
    name: "Research Helper",
    description: "Assistance with research, data analysis, and information gathering",
    usage: 321,
    createdAt: "2023-12-10",
    status: "disabled"
  }
];

const UserDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Filter out disabled agents
  const activeAgents = availableAgents.filter(agent => agent.status !== 'disabled');
  
  if (!selectedAgent) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Choose an AI Assistant</h1>
          <p className="text-muted-foreground mt-2">Select an agent to start your conversation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAgents.map((agent) => (
            <Card 
              key={agent.id} 
              className="transition-all hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedAgent(agent)}
            >
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>
                  Usage: {agent.usage.toLocaleString()} conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{agent.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return <ChatDashboard initialAgent={selectedAgent} />;
};

export default UserDashboard;
