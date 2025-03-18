
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save } from "lucide-react";
import { Agent } from '../../types/Agent';

interface SettingsSectionProps {
  agent: Agent;
  editedAgent: Agent;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSaveChanges: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ 
  editedAgent, 
  onInputChange, 
  onSaveChanges 
}) => {
  return (
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
                onChange={onInputChange} 
                className="border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1 text-slate-700">Description</label>
              <Textarea 
                id="description" 
                name="description"
                value={editedAgent.description} 
                onChange={onInputChange} 
                className="min-h-[100px] border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1 text-slate-700">Category</label>
              <Input 
                id="category" 
                name="category"
                value={editedAgent.category || ''} 
                onChange={onInputChange} 
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
                onChange={onInputChange} 
                className="border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium mb-1 text-slate-700">Author</label>
              <Input 
                id="author" 
                name="author"
                value={editedAgent.author || ''} 
                onChange={onInputChange} 
                className="border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1 text-slate-700">Status</label>
              <select
                id="status"
                name="status"
                value={editedAgent.status}
                onChange={onInputChange as any}
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
                onClick={onSaveChanges}
              >
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SettingsSection;
