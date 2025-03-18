
import React, { useState } from "react";
import ChatDashboard from "./chat/ChatDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "./types/Agent";
import { HelpCircle, Clock, BarChart2 } from "lucide-react";

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
          <h1 className="text-3xl font-bold tracking-tight">Choose an AI Assistant</h1>
          <p className="text-muted-foreground mt-2">Select an agent to start your conversation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAgents.map((agent) => (
            <Card 
              key={agent.id} 
              className="transition-all hover:shadow-lg cursor-pointer hover:-translate-y-1 duration-200 border-border/50 bg-card/80 backdrop-blur-sm"
              onClick={() => setSelectedAgent(agent)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Created {new Date(agent.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm mb-4">{agent.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="secondary" className="flex items-center gap-1 font-normal">
                    <BarChart2 className="h-3 w-3" />
                    {agent.usage.toLocaleString()} conversations
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" /> 
                    Click to start
                  </span>
                </div>
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
