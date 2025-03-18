
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
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

const AnalyticsCharts = () => {
  return (
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
  );
};

export default AnalyticsCharts;
