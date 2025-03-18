
import { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "../ChatMessage";

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

const ChatContainer = ({ initialMessages = [], onInfoUpdate }: ChatContainerProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Update local messages state when initialMessages prop changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Update info panel when messages change
    const lastAgentMessage = [...messages].reverse().find(m => m.role === 'agent' && m.info);
    if (lastAgentMessage?.info) {
      onInfoUpdate(lastAgentMessage.info);
    }
  }, [messages, onInfoUpdate]);

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full pr-4">
        <div className="space-y-4 p-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-[50vh] text-center">
              <div className="max-w-md">
                <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Send a message to begin chatting with the AI assistant.
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatContainer;
