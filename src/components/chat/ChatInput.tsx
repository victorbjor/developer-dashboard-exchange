
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Mic, Send, X, FileUp, BarChart3 } from "lucide-react";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (message: string, attachments: File[]) => void;
  isSending: boolean;
}

const ChatInput = ({ onSendMessage, isSending }: ChatInputProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if ((!inputMessage.trim() && attachments.length === 0) || isSending) return;
    onSendMessage(inputMessage, attachments);
    setInputMessage('');
    setAttachments([]);
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

  return (
    <div className="mt-4 flex flex-col">
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
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileUpload} 
        multiple
      />
    </div>
  );
};

export default ChatInput;
