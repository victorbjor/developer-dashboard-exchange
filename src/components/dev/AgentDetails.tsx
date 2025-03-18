
import React, { useState } from 'react';
import { toast } from "sonner";
import { Agent } from '../types/Agent';
import AgentHeader from './agent-details/AgentHeader';
import StatisticsSection from './agent-details/StatisticsSection';
import SettingsSection from './agent-details/SettingsSection';
import CodeSection from './agent-details/CodeSection';
import HelpBanner from './agent-details/HelpBanner';

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
      <AgentHeader agent={agent} onBack={onBack} />
      <StatisticsSection usage={agent.usage} />
      <SettingsSection 
        agent={agent}
        editedAgent={editedAgent}
        onInputChange={handleInputChange}
        onSaveChanges={handleSaveChanges}
      />
      <CodeSection 
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
        onUploadCode={handleUploadCode}
      />
      <HelpBanner />
    </div>
  );
};

export default AgentDetails;
