
import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { FileUp, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Agent } from '../types/Agent';

// Mock data for agent analytics
const mockDailyUsage = [
  { date: '2024-01-01', usage: 45 },
  { date: '2024-01-02', usage: 52 },
  { date: '2024-01-03', usage: 61 },
  { date: '2024-01-04', usage: 58 },
  { date: '2024-01-05', usage: 63 },
  { date: '2024-01-06', usage: 47 },
  { date: '2024-01-07', usage: 71 },
];

const mockResponseTimes = [
  { date: '2024-01-01', time: 0.82 },
  { date: '2024-01-02', time: 0.75 },
  { date: '2024-01-03', time: 0.78 },
  { date: '2024-01-04', time: 0.71 },
  { date: '2024-01-05', time: 0.69 },
  { date: '2024-01-06', time: 0.73 },
  { date: '2024-01-07', time: 0.68 },
];

interface AgentDetailsProps {
  agent: Agent;
  onBack: () => void;
  onUpdate: (updatedAgent: Agent) => void;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent, onBack, onUpdate }) => {
  const [editedAgent, setEditedAgent] = useState<Agent>({ ...agent });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedAgent(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSaveChanges = () => {
    const updatedAgent = {
      ...editedAgent,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    onUpdate(updatedAgent);
    toast.success("Agent updated successfully");
  };

  const handleUploadCode = () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }
    
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Uploading agent code...',
        success: () => {
          setSelectedFile(null);
          return 'Agent code updated successfully';
        },
        error: 'Upload failed',
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
        <div>
          <h2 className="text-2xl font-semibold">{agent.name}</h2>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            agent.status === 'active' ? 'bg-green-100 text-green-800' :
            agent.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {agent.status}
          </span>
        </div>
      </div>
      
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="code">Agent Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{agent.usage.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">All-time interactions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0.74s</div>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.7/5</div>
                <p className="text-sm text-muted-foreground">Based on 28 ratings</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage</CardTitle>
              <CardDescription>Number of interactions per day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                      month: 'short', 
                      day: 'numeric'
                    })} 
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} interactions`, 'Usage']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  />
                  <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Response Time</CardTitle>
              <CardDescription>Average response time in seconds</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockResponseTimes}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                      month: 'short', 
                      day: 'numeric'
                    })} 
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}s`, 'Response Time']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription>Update your agent's information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Agent Name</label>
                <Input 
                  id="name" 
                  name="name"
                  value={editedAgent.name} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={editedAgent.description} 
                  onChange={handleInputChange} 
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                <Input 
                  id="category" 
                  name="category"
                  value={editedAgent.category || ''} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Customer Support, Content Generation"
                />
              </div>
              
              <div>
                <label htmlFor="version" className="block text-sm font-medium mb-1">Version</label>
                <Input 
                  id="version" 
                  name="version"
                  value={editedAgent.version || '1.0.0'} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">Author</label>
                <Input 
                  id="author" 
                  name="author"
                  value={editedAgent.author || ''} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                <select
                  id="status"
                  name="status"
                  value={editedAgent.status}
                  onChange={handleInputChange as any}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="ml-auto flex items-center gap-2"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Code</CardTitle>
              <CardDescription>Upload new code for your agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
                <FileUp className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop your files here, or 
                  <label className="text-primary hover:text-primary/80 ml-1 cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports .json, .py, and other agent files
                </p>
                
                {selectedFile && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium">Selected file:</p>
                    <div className="mt-1 py-1 px-2 bg-secondary rounded mb-1 truncate text-xs">
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full mt-4 flex items-center justify-center gap-2" 
                onClick={handleUploadCode}
                disabled={!selectedFile}
              >
                <FileUp className="h-4 w-4" />
                Upload New Agent Code
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Deployment History</CardTitle>
              <CardDescription>Previous code deployments for this agent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { version: '1.2.3', date: '2024-01-07', author: 'John Doe' },
                  { version: '1.2.2', date: '2023-12-15', author: 'John Doe' },
                  { version: '1.2.1', date: '2023-11-22', author: 'Jane Smith' },
                ].map((deployment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b last:border-0">
                    <div>
                      <div className="font-medium">Version {deployment.version}</div>
                      <div className="text-xs text-muted-foreground">
                        {deployment.date} by {deployment.author}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Restore</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetails;
