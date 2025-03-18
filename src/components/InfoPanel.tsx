
import { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface InfoPanelProps {
  markdownContent: string;
}

const InfoPanel = ({ markdownContent }: InfoPanelProps) => {
  const [htmlContent, setHtmlContent] = useState("");
  
  useEffect(() => {
    // In a real implementation, we would use a proper markdown parser like marked or remark
    // For this demo, we'll do some basic formatting
    const formattedContent = markdownContent
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-5 mb-3">$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
      // Add proper list tags
      .replace(/(<li.*<\/li>)/gim, '<ul class="my-2">$1</ul>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-muted p-4 rounded-md my-4 overflow-auto text-sm"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]*)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      // Blockquote
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-muted-foreground/30 pl-4 italic my-4">$1</blockquote>')
      // Line breaks
      .replace(/\n/gim, '<br />');
    
    setHtmlContent(formattedContent);
  }, [markdownContent]);

  return (
    <ScrollArea className="h-[60vh] pr-4">
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </ScrollArea>
  );
};

export default InfoPanel;
