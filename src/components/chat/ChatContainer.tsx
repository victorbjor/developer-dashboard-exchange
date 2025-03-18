
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "../ChatMessage";
import ChatInput from "./ChatInput";

export interface Attachment {
  name: string;
  type: string;
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  info?: string | null;
  attachments?: Attachment[];
}

interface ChatContainerProps {
  initialMessages: Message[];
  onInfoUpdate: (info: string | null) => void;
}

const ChatContainer = ({ initialMessages, onInfoUpdate }: ChatContainerProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Update info panel when messages change
    const lastInfoMessage = [...messages].reverse().find(m => m.role === 'agent' && m.info);
    if (lastInfoMessage?.info) {
      onInfoUpdate(lastInfoMessage.info);
    }
  }, [messages, onInfoUpdate]);

  const handleSendMessage = async (message: string, attachments: File[]) => {
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
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
    </div>
  );
};

export default ChatContainer;
