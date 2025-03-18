
import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileUp, Save, ArrowLeft, BarChart2, Settings, Code, ChevronRight
} from "lucide-react";
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

const satisfactionData = [
  { name: "Satisfied", value: 68 },
  { name: "Neutral", value: 22 },
  { name: "Unsatisfied", value: 10 },
];

const COLORS = ["#3B82F6", "#93C5FD", "#BFDBFE"];

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
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack}
          className="h-9 w-9 shadow-sm hover:shadow transition-all border-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold">{agent.name}</h2>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            agent.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
            agent.status === 'inactive' ? 'bg-slate-100 text-slate-800' :
            agent.status === 'disabled' ? 'bg-red-100 text-red-800' :
            'bg-amber-100 text-amber-800'
          }`}>
            {agent.status}
          </span>
        </div>
      </div>

      {/* Statistics Row - Smaller cards */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Analytics Overview</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-sm font-medium text-slate-600">Total Usage</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-4">
              <div className="text-2xl font-bold text-slate-800">{agent.usage.toLocaleString()}</div>
              <p className="text-xs text-slate-500">All-time interactions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-sm font-medium text-slate-600">Avg. Response</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-4">
              <div className="text-2xl font-bold text-slate-800">0.74s</div>
              <p className="text-xs text-slate-500">Last 7 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-sm font-medium text-slate-600">Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-4">
              <div className="text-2xl font-bold text-slate-800">4.7/5</div>
              <p className="text-xs text-slate-500">Based on 28 ratings</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-sm font-medium text-slate-600">Active Deployments</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-4">
              <div className="text-2xl font-bold text-slate-800">3</div>
              <p className="text-xs text-slate-500">Across 2 platforms</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts - smaller, in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-slate-600">Daily Usage</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockDailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                      month: 'short', 
                      day: 'numeric'
                    })}
                    tick={{fontSize: 10}}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value) => [`${value} interactions`, 'Usage']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                  <Bar dataKey="usage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-slate-600">Response Time</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockResponseTimes}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', {
                      month: 'short', 
                      day: 'numeric'
                    })}
                    tick={{fontSize: 10}}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value) => [`${value}s`, 'Response Time']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm font-medium text-slate-600">User Satisfaction</CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[180px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Settings Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Agent Settings</h3>
        </div>
        
        <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm">
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-slate-700">Agent Name</label>
                <Input 
                  id="name" 
                  name="name"
                  value={editedAgent.name} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1 text-slate-700">Description</label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={editedAgent.description} 
                  onChange={handleInputChange} 
                  className="min-h-[100px] border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1 text-slate-700">Category</label>
                <Input 
                  id="category" 
                  name="category"
                  value={editedAgent.category || ''} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Customer Support, Content Generation"
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="version" className="block text-sm font-medium mb-1 text-slate-700">Version</label>
                <Input 
                  id="version" 
                  name="version"
                  value={editedAgent.version || '1.0.0'} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
              
              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1 text-slate-700">Author</label>
                <Input 
                  id="author" 
                  name="author"
                  value={editedAgent.author || ''} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus-visible:ring-slate-400"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1 text-slate-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={editedAgent.status}
                  onChange={handleInputChange as any}
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white flex items-center gap-2 shadow-sm hover:shadow"
                  onClick={handleSaveChanges}
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Agent Code Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Agent Code</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm h-full">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-base text-slate-800">Upload New Code</CardTitle>
                <CardDescription className="text-slate-500">Update your agent's functionality</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center bg-slate-50/50">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 mb-4">
                    <FileUp className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
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
                  <p className="text-xs text-slate-500 mt-1">
                    Supports .json, .py, .js, and other agent files
                  </p>
                  
                  {selectedFile && (
                    <div className="mt-4 text-left">
                      <p className="text-sm font-medium text-slate-700">Selected file:</p>
                      <div className="mt-1 py-2 px-3 bg-white border border-slate-200 rounded flex items-center justify-between">
                        <span className="truncate text-xs text-slate-600">
                          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                          className="h-6 w-6 p-0"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 shadow-sm hover:shadow" 
                  onClick={handleUploadCode}
                  disabled={!selectedFile}
                >
                  <FileUp className="h-4 w-4" />
                  Upload New Agent Code
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-sm h-full">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-base text-slate-800">Deployment History</CardTitle>
                <CardDescription className="text-slate-500">Previous code deployments</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pb-0">
                <div className="space-y-0">
                  {[
                    { version: '1.2.3', date: '2024-01-07', author: 'John Doe' },
                    { version: '1.2.2', date: '2023-12-15', author: 'John Doe' },
                    { version: '1.2.1', date: '2023-11-22', author: 'Jane Smith' },
                  ].map((deployment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-md transition-colors duration-150 group">
                      <div>
                        <div className="font-medium text-sm text-slate-800">Version {deployment.version}</div>
                        <div className="text-xs text-slate-500">
                          {deployment.date} by {deployment.author}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Image banner at the bottom */}
      <div className="relative h-48 overflow-hidden rounded-xl mb-6 shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200" 
          alt="Technology Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <div className="px-8 text-white">
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="max-w-md text-white/90 text-sm">
              Check our documentation for more information on creating and managing AI agents.
            </p>
            <Button className="mt-4 bg-white text-primary hover:bg-white/90 shadow-sm hover:shadow">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
