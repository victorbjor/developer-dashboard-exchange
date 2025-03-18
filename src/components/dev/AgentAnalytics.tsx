
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Agent } from "../types/Agent";

interface AgentAnalyticsProps {
  agent: Agent;
}

// Sample data for agent analytics
const usageData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 120 },
  { name: "Mar", value: 98 },
  { name: "Apr", value: 75 },
  { name: "May", value: 140 },
  { name: "Jun", value: 110 },
  { name: "Jul", value: 180 },
];

const responseTimeData = [
  { name: "Jan", value: 2.4 },
  { name: "Feb", value: 2.1 },
  { name: "Mar", value: 1.8 },
  { name: "Apr", value: 1.6 },
  { name: "May", value: 1.5 },
  { name: "Jun", value: 1.3 },
  { name: "Jul", value: 1.1 },
];

const satisfactionData = [
  { name: "Satisfied", value: 68 },
  { name: "Neutral", value: 22 },
  { name: "Unsatisfied", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AgentAnalytics = ({ agent }: AgentAnalyticsProps) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="card-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{agent.usage.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total conversations</p>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.8s</div>
            <p className="text-sm text-muted-foreground">Average time to respond</p>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">User Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-sm text-muted-foreground">Positive feedback rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Response Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="text-lg font-medium">User Satisfaction Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "var(--radius)", border: "1px solid hsl(var(--border))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentAnalytics;
