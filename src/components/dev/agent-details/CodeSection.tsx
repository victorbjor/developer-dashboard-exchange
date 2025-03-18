
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, FileUp, ChevronRight } from "lucide-react";

interface CodeSectionProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadCode: () => void;
}

const CodeSection: React.FC<CodeSectionProps> = ({ 
  selectedFile, 
  onFileChange,
  onUploadCode
}) => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Code className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Agent Code</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-base">Upload New Code</CardTitle>
              <CardDescription>Update your agent's functionality</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center bg-muted/30">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-4">
                  <FileUp className="h-8 w-8 text-primary" />
                </div>
                <p className="mt-2 text-sm">
                  Drag and drop your files here, or 
                  <label className="text-primary hover:text-primary/80 ml-1 cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={onFileChange}
                    />
                  </label>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports .json, .py, .js, and other agent files
                </p>
                
                {selectedFile && (
                  <div className="mt-4 text-left">
                    <p className="text-sm font-medium">Selected file:</p>
                    <div className="mt-1 py-2 px-3 bg-background border border-border rounded flex items-center justify-between">
                      <span className="truncate text-xs text-muted-foreground">
                        {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onFileChange({ target: { files: null } } as any)}
                        className="h-6 w-6 p-0"
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full mt-4 flex items-center justify-center gap-2" 
                onClick={onUploadCode}
                disabled={!selectedFile}
              >
                <FileUp className="h-4 w-4" />
                Upload New Agent Code
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-base">Deployment History</CardTitle>
              <CardDescription>Previous code deployments</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pb-0">
              <div className="space-y-0">
                {[
                  { version: '1.2.3', date: '2024-01-07', author: 'John Doe' },
                  { version: '1.2.2', date: '2023-12-15', author: 'John Doe' },
                  { version: '1.2.1', date: '2023-11-22', author: 'Jane Smith' },
                ].map((deployment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors duration-150 group">
                    <div>
                      <div className="font-medium text-sm">{deployment.version}</div>
                      <div className="text-xs text-muted-foreground">
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
  );
};

export default CodeSection;
