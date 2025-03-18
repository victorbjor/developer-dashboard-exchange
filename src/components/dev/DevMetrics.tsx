
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight } from "lucide-react";

interface DevMetricsProps {
  totalUsage: number;
  activeAgents: number;
  totalAgents: number;
}

const DevMetrics = ({ totalUsage, activeAgents, totalAgents }: DevMetricsProps) => {
  return (
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
          <p className="text-xs text-muted-foreground mt-1">Of {totalAgents} total agents</p>
          <Progress value={(activeAgents / totalAgents) * 100} className="h-1 mt-2" />
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
  );
};

export default DevMetrics;
