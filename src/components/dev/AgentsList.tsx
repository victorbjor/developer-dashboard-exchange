
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Agent } from '../types/Agent';

interface AgentsListProps {
  agents: Agent[];
}

const AgentsList = ({ agents }: AgentsListProps) => {
  return (
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
  );
};

export default AgentsList;
