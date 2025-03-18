
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code2, BarChart3, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white mb-6">
          <Code2 className="h-8 w-8" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">AgentHub Platform</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Build, deploy, and interact with AI agents in one place. Powerful tools for developers, seamless experiences for users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="glass p-8 rounded-xl shadow-sm transition-transform duration-200 hover:shadow-md flex flex-col items-center text-center">
          <BarChart3 className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">For Developers</h2>
          <p className="text-muted-foreground mb-6">
            Build and deploy AI agents, monitor usage, and manage your integrations.
          </p>
          <Link to="/developers" className="mt-auto">
            <Button size="lg">Go to Developer Dashboard</Button>
          </Link>
        </div>

        <div className="glass p-8 rounded-xl shadow-sm transition-transform duration-200 hover:shadow-md flex flex-col items-center text-center">
          <MessageSquare className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">For Users</h2>
          <p className="text-muted-foreground mb-6">
            Interact with AI agents through chat, upload files, record audio, and get intelligent responses.
          </p>
          <Link to="/users" className="mt-auto">
            <Button size="lg">Go to User Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
