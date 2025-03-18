
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Agent } from '../types/Agent';

interface AgentUploaderProps {
  onAgentAdded: (agent: Agent) => void;
}

const AgentUploader = ({ onAgentAdded }: AgentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setSelectedFiles(fileArray);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(fileArray);
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    
    // Mock file upload
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Uploading files...',
        success: () => {
          // Create a new mock agent
          const newAgent: Agent = {
            id: Date.now().toString(),
            name: `New Agent from Upload`,
            description: 'Recently uploaded agent',
            usage: 0,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'pending'
          };
          
          onAgentAdded(newAgent);
          setSelectedFiles([]);
          
          return `Successfully uploaded ${selectedFiles.length} file(s)`;
        },
        error: 'Upload failed',
      }
    );
  };

  return (
    <Card className="hover-shadow">
      <CardHeader>
        <CardTitle>Upload New Agent</CardTitle>
        <CardDescription>Drag and drop your agent files</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileUp className="h-10 w-10 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop your files here, or 
            <label className="text-primary hover:text-primary/80 ml-1 cursor-pointer">
              browse
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports .json, .py, and other agent files
          </p>
          
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium">Selected files:</p>
              <ul className="mt-2 text-xs text-left">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="py-1 px-2 bg-secondary rounded mb-1 truncate">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full mt-4 flex items-center justify-center gap-2" 
          onClick={handleUpload}
          disabled={selectedFiles.length === 0}
        >
          <UploadCloud className="h-4 w-4" />
          Upload to Backend
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentUploader;
