
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Agent } from '../types/Agent';

interface AgentCreatorProps {
  onBack: () => void;
  onAgentCreated: (agent: Agent) => void;
}

const AgentCreator: React.FC<AgentCreatorProps> = ({ onBack, onAgentCreated }) => {
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: '',
    description: '',
    category: '',
    author: '',
    version: '1.0.0',
    status: 'pending',
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAgent(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAgent(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setSelectedFiles(fileArray);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      setSelectedFiles(fileArray);
    }
  };

  const handleCreateAgent = () => {
    if (!newAgent.name) {
      toast.error("Agent name is required");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one agent file");
      return;
    }
    
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Creating new agent...',
        success: () => {
          const createdAgent: Agent = {
            id: Date.now().toString(),
            name: newAgent.name!,
            description: newAgent.description || 'No description provided',
            usage: 0,
            createdAt: new Date().toISOString().split('T')[0],
            status: newAgent.status as 'active' | 'inactive' | 'pending',
            category: newAgent.category,
            author: newAgent.author,
            version: newAgent.version,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
          
          onAgentCreated(createdAgent);
          return 'Agent created successfully';
        },
        error: 'Failed to create agent',
      }
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-semibold">Create New Agent</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent Information</CardTitle>
            <CardDescription>Basic details about your new agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Agent Name *</label>
              <Input 
                id="name" 
                name="name"
                value={newAgent.name} 
                onChange={handleInputChange} 
                placeholder="E.g., Customer Support Assistant"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                id="description" 
                name="description"
                value={newAgent.description} 
                onChange={handleInputChange} 
                placeholder="Describe what your agent does"
                className="min-h-[100px]"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <Input 
                id="category" 
                name="category"
                value={newAgent.category} 
                onChange={handleInputChange} 
                placeholder="E.g., Customer Support, Content Generation"
              />
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-1">Author</label>
              <Input 
                id="author" 
                name="author"
                value={newAgent.author} 
                onChange={handleInputChange} 
                placeholder="Your name or team"
              />
            </div>
            
            <div>
              <label htmlFor="version" className="block text-sm font-medium mb-1">Initial Version</label>
              <Input 
                id="version" 
                name="version"
                value={newAgent.version} 
                onChange={handleInputChange} 
                placeholder="E.g., 1.0.0"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">Initial Status</label>
              <select
                id="status"
                name="status"
                value={newAgent.status}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Agent Files</CardTitle>
            <CardDescription>Upload the necessary files for your agent</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center"
              onDragOver={handleDragOver}
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
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleCreateAgent}
              disabled={!newAgent.name || selectedFiles.length === 0}
            >
              <Save className="h-4 w-4" />
              Create Agent
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AgentCreator;
