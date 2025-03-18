
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

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

interface StatisticsSectionProps {
  usage: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ usage }) => {
  return (
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
            <div className="text-2xl font-bold text-slate-800">{usage.toLocaleString()}</div>
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
  );
};

export default StatisticsSection;
