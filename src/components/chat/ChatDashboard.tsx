
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, BookOpenText } from "lucide-react";
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';
import AgentSelector from '../AgentSelector';
import { Agent } from '../types/Agent';
import { Message } from './ChatContainer';
import InfoPanel from '../InfoPanel';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatDashboardProps {
  initialAgent?: Agent | null;
}

const mockAgents = [
  { id: '1', name: 'Customer Support', description: 'Get help with products and services' },
  { id: '2', name: 'Product Recommendation', description: 'Get personalized product recommendations' },
  { id: '3', name: 'Technical Support', description: 'Get technical assistance' }
];

// Initial empty messages array
const initialMessages: Message[] = [];

const ChatDashboard: React.FC<ChatDashboardProps> = ({ initialAgent }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(initialAgent || null);
  const [showSelection, setShowSelection] = useState<boolean>(!initialAgent);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const [infoContent, setInfoContent] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const isMobile = useIsMobile();

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowSelection(false);
  };
  
  const handleBackToSelection = () => {
    setShowSelection(true);
    setSelectedAgent(null);
    setMessages([]);
    setInfoContent(null);
    setShowInfoPanel(false);
  };

  const handleSendMessage = async (message: string, attachments: File[]) => {
    if ((!message.trim() && attachments.length === 0) || isSending) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString(),
      attachments: attachments.map(file => ({
        name: file.name,
        type: file.type
      }))
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsSending(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const mockResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I've processed your request${attachments.length ? ` with ${attachments.length} file(s)` : ''}. Here's my response to "${message.trim() || 'your files'}"`,
        timestamp: new Date().toISOString(),
        info: `## Additional Information\n\nHere is some markdown content that provides more context:\n\n- Point one with important details\n- Point two with technical explanation\n\n### Code Example\n\`\`\`javascript\nconst data = analyze(userInput);\nreturn formatResponse(data);\n\`\`\`\n\n> Note: This is simulated markdown content that would normally contain information relevant to the user's query.`
      };
      
      setMessages(prev => [...prev, mockResponse]);
      setIsSending(false);
      
      // Update info panel with the new message's info content
      if (mockResponse.info) {
        setInfoContent(mockResponse.info);
      }
    }, 1500);
  };

  const handleInfoUpdate = (info: string | null) => {
    setInfoContent(info);
  };
  
  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  if (showSelection) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Choose an AI Assistant</h1>
          <p className="text-muted-foreground mt-2">Select an agent to start your conversation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
            <div 
              key={agent.id} 
              className="border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleAgentSelect(agent as Agent)}
            >
              <h3 className="font-medium text-lg">{agent.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="border-b p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" onClick={handleBackToSelection}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-medium">
          {selectedAgent ? `Chat with ${selectedAgent.name}` : 'Chat with AI Assistant'}
        </h1>
        <div className="flex items-center gap-2">
          <AgentSelector 
            agents={mockAgents as Agent[]} 
            selectedAgent={selectedAgent} 
            onSelectAgent={handleAgentSelect} 
          />
        </div>
      </div>
      
      <div className={`flex-1 flex ${showInfoPanel ? (isMobile ? "flex-col" : "flex-row") : "flex-col"} overflow-hidden`}>
        {/* Main chat area */}
        <div className={`flex-1 flex flex-col relative ${isMobile && showInfoPanel ? "h-[50vh]" : ""}`}>
          <div className="flex-1 overflow-hidden">
            <ChatContainer 
              initialMessages={messages} 
              onInfoUpdate={handleInfoUpdate}
            />
            
            {infoContent && (
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="shadow-md"
                  onClick={toggleInfoPanel}
                  title="Show additional information"
                >
                  <BookOpenText className="h-4 w-4" />
                  {!showInfoPanel && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </div>
            )}
          </div>
          
          <div className="border-t p-4 bg-background">
            <div className="max-w-3xl w-full mx-auto flex gap-2">
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isSending={isSending} 
              />
              <Button 
                size="icon" 
                type="submit" 
                form="chatForm" 
                disabled={isSending}
                onClick={() => {
                  const formElement = document.getElementById("chatForm") as HTMLFormElement;
                  if (formElement) formElement.requestSubmit();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Info Panel - conditionally shown */}
        {showInfoPanel && infoContent && (
          <div className={`${isMobile ? "border-t" : "border-l"} p-4 ${isMobile ? "flex-1 overflow-auto" : "w-[400px] overflow-hidden"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Additional Information</h3>
              <Button variant="ghost" size="icon" onClick={toggleInfoPanel}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <InfoPanel markdownContent={infoContent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
