
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, BarChart3, FileUp, Users, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Agent {
  id: string;
  name: string;
  description: string;
  usage: number;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries and support requests',
    usage: 876,
    createdAt: '2023-10-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Product Recommendation Agent',
    description: 'Suggests products based on user preferences',
    usage: 543,
    createdAt: '2023-11-02',
    status: 'active'
  },
  {
    id: '3',
    name: 'Data Analysis Assistant',
    description: 'Helps analyze and visualize complex data',
    usage: 321,
    createdAt: '2023-12-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'New Marketing Agent',
    description: 'Drafts marketing content and campaigns',
    usage: 0,
    createdAt: '2024-01-05',
    status: 'pending'
  }
];

const mockUsageData = [
  { name: 'Jan', usage: 400 },
  { name: 'Feb', usage: 600 },
  { name: 'Mar', usage: 550 },
  { name: 'Apr', usage: 780 },
  { name: 'May', usage: 890 },
  { name: 'Jun', usage: 1100 },
  { name: 'Jul', usage: 1200 },
];

const mockResponseTimes = [
  { name: 'Jan', time: 1.2 },
  { name: 'Feb', time: 1.1 },
  { name: 'Mar', time: 0.9 },
  { name: 'Apr', time: 0.85 },
  { name: 'May', time: 0.75 },
  { name: 'Jun', time: 0.72 },
  { name: 'Jul', time: 0.68 },
];

const DevDashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
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
    
    // Mock file upload to example.com/upload
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Uploading files...',
        success: () => {
          // Add a new mock agent
          const newAgent = {
            id: (agents.length + 1).toString(),
            name: `New Agent ${agents.length + 1}`,
            description: 'Recently uploaded agent',
            usage: 0,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'pending' as const
          };
          
          setAgents([...agents, newAgent]);
          setSelectedFiles([]);
          
          return `Successfully uploaded ${selectedFiles.length} file(s)`;
        },
        error: 'Upload failed',
      }
    );
  };

  const totalUsage = agents.reduce((sum, agent) => sum + agent.usage, 0);
  const activeAgents = agents.filter(agent => agent.status === 'active').length;

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Developer Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button className="flex items-center gap-2">
          <UploadCloud className="h-4 w-4" />
          Create New Agent
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{totalUsage.toLocaleString()}</div>
              <div className="text-sm text-green-600 flex items-center">
                +12.5% <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total agent interactions</p>
          </CardContent>
        </Card>
        
        <Card className="hover-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">Of {agents.length} total agents</p>
            <Progress value={(activeAgents / agents.length) * 100} className="h-1 mt-2" />
          </CardContent>
        </Card>
        
        <Card className="hover-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">0.68s</div>
              <div className="text-sm text-green-600 flex items-center">
                -5.6% <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>
        
        <Card className="hover-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground mt-1">Based on feedback</p>
            <Progress value={94} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 hover-shadow">
          <CardHeader>
            <CardTitle>Agent Analytics</CardTitle>
            <CardDescription>Usage metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="usage">
              <TabsList className="mb-4">
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="response">Response Time</TabsTrigger>
              </TabsList>
              
              <TabsContent value="usage" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockUsageData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="response" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockResponseTimes}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="time" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
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
      </div>
      
      <Card className="hover-shadow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Agents</CardTitle>
              <CardDescription>Manage your deployed AI agents</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
              <div className="col-span-4 md:col-span-3">Name</div>
              <div className="col-span-4 md:col-span-3 hidden md:block">Description</div>
              <div className="col-span-3 md:col-span-2 text-right md:text-center">Usage</div>
              <div className="col-span-3 md:col-span-2 text-right md:text-center">Created</div>
              <div className="col-span-2 md:col-span-2 text-right">Status</div>
            </div>
            
            <div className="divide-y">
              {agents.map(agent => (
                <div key={agent.id} className="grid grid-cols-12 p-4 text-sm items-center">
                  <div className="col-span-4 md:col-span-3 font-medium">{agent.name}</div>
                  <div className="col-span-4 md:col-span-3 text-muted-foreground truncate hidden md:block">
                    {agent.description}
                  </div>
                  <div className="col-span-3 md:col-span-2 text-right md:text-center">{agent.usage.toLocaleString()}</div>
                  <div className="col-span-3 md:col-span-2 text-muted-foreground text-right md:text-center">{agent.createdAt}</div>
                  <div className="col-span-2 md:col-span-2 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' :
                      agent.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevDashboard;
