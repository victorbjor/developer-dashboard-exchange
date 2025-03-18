
import { Avatar } from "@/components/ui/avatar";
import { BarChart3, FileText, User } from "lucide-react";
import { format } from "date-fns";

interface Attachment {
  name: string;
  type: string;
}

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  info?: string | null;
  attachments?: Attachment[];
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mt-1">
          <BarChart3 className="h-4 w-4" />
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} px-4 py-3 rounded-2xl`}>
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.attachments.map((attachment, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/10"
              >
                <FileText className="h-3 w-3" />
                <span className="truncate max-w-32">{attachment.name}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-xs opacity-70 mt-1">
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 mt-1">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
