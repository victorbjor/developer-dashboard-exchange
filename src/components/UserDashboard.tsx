
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, FileUp, Mic, Send, Upload, X, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import AgentSelector from "./AgentSelector";
import ChatMessage from "./ChatMessage";
import InfoPanel from "./InfoPanel";

// Mock agents data
const mockAgents = [
  { id: "1", name: "Customer Support Agent", description: "Handles customer inquiries" },
  { id: "2", name: "Product Recommendation Agent", description: "Suggests products based on preferences" },
  { id: "3", name: "Data Analysis Assistant", description: "Helps analyze and visualize data" },
];

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  info?: string | null;
  attachments?: {name: string, type: string}[];
}

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

const UserDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState(mockAgents[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && attachments.length === 0) || isSending) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
      attachments: attachments.map(file => ({
        name: file.name,
        type: file.type
      }))
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setAttachments([]);
    setIsSending(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const mockResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I've processed your request${attachments.length ? ` with ${attachments.length} file(s)` : ''}. Here's my response to "${inputMessage.trim() || 'your files'}"`,
        timestamp: new Date().toISOString(),
        info: `## Additional Information\n\nHere is some markdown content that provides more context:\n\n- Point one with important details\n- Point two with technical explanation\n\n### Code Example\n\`\`\`javascript\nconst data = analyze(userInput);\nreturn formatResponse(data);\n\`\`\`\n\n> Note: This is simulated markdown content that would normally contain information relevant to the user's query.`
      };
      
      setMessages(prev => [...prev, mockResponse]);
      setIsSending(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileArray]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording logic would go here
      setIsRecording(false);
      toast.success("Audio recorded successfully");
      // Mock adding an audio file to attachments
      const mockAudioFile = new File([""], "voice-recording.mp3", { type: "audio/mpeg" });
      setAttachments(prev => [...prev, mockAudioFile]);
    } else {
      // Request microphone access
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setIsRecording(true);
          toast.info("Recording started...");
        })
        .catch(() => {
          toast.error("Microphone access denied");
        });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Find the last agent message with info content
  const lastInfoMessage = [...messages].reverse().find(m => m.role === 'agent' && m.info);

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
            <div className="flex flex-col h-[60vh]">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Attachments area */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 my-2 p-2 bg-muted/30 rounded-md">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-1 bg-background px-2 py-1 rounded border text-xs">
                      <span className="truncate max-w-32">{file.name}</span>
                      <button onClick={() => handleRemoveAttachment(index)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Message input */}
              <div className="mt-4 flex flex-col">
                <div className="relative">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="min-h-24 pr-20 resize-none"
                    disabled={isSending}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={triggerFileInput}
                      disabled={isSending}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={isRecording ? "destructive" : "ghost"}
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={toggleRecording}
                      disabled={isSending}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={handleSendMessage}
                      disabled={(!inputMessage.trim() && attachments.length === 0) || isSending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Custom action buttons */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1" 
                    onClick={() => {
                      setInputMessage("Analyze the data in the attached file");
                      toast.info("Custom prompt added. You can now attach a file and send.");
                    }}
                  >
                    <FileUp className="h-3 w-3" />
                    <span>Analyze Data</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => {
                      setInputMessage("Summarize the key points from the document");
                      toast.info("Custom prompt added. You can now attach a file and send.");
                    }}
                  >
                    <BarChart3 className="h-3 w-3" />
                    <span>Summarize Document</span>
                  </Button>
                </div>
              </div>
              
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileUpload} 
                multiple
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Info panel for displaying markdown content */}
        <Card className="hover-shadow">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            {lastInfoMessage?.info ? (
              <InfoPanel markdownContent={lastInfoMessage.info} />
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

export default UserDashboard;
