
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { BarChart3 } from "lucide-react";
import AgentSelector from "../AgentSelector";
import ChatContainer, { Message } from "./ChatContainer";
import InfoPanel from "../InfoPanel";

// Mock agents data
const mockAgents = [
  { id: "1", name: "Customer Support Agent", description: "Handles customer inquiries" },
  { id: "2", name: "Product Recommendation Agent", description: "Suggests products based on preferences" },
  { id: "3", name: "Data Analysis Assistant", description: "Helps analyze and visualize data" },
];

// Mock chat messages for initial display
const initialMessages: Message[] = [
  {
    id: '1',
    role: 'agent',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 50000).toISOString(),
    info: null
  }
];

const ChatDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState(mockAgents[0]);
  const [currentInfo, setCurrentInfo] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4 md:p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Agent Chat</h1>
          <p className="text-muted-foreground">Interact with AI agents to get assistance</p>
        </div>
        <AgentSelector 
          agents={mockAgents} 
          selectedAgent={selectedAgent} 
          onSelectAgent={setSelectedAgent} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 hover-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar>
                <BarChart3 className="h-5 w-5" />
              </Avatar>
              <span>{selectedAgent?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChatContainer 
              initialMessages={initialMessages} 
              onInfoUpdate={setCurrentInfo}
            />
          </CardContent>
        </Card>
        
        {/* Info panel for displaying markdown content */}
        <Card className="hover-shadow">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            {currentInfo ? (
              <InfoPanel markdownContent={currentInfo} />
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mb-4 opacity-20" />
                <p>Additional information and context will appear here when the agent provides it.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatDashboard;
