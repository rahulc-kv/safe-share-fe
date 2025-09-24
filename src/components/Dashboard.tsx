import React from 'react';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  XCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  { name: 'Week 1', nudges: 45, ack: 38, override: 4 },
  { name: 'Week 2', nudges: 52, ack: 44, override: 3 },
  { name: 'Week 3', nudges: 38, ack: 32, override: 2 },
  { name: 'Week 4', nudges: 41, ack: 35, override: 3 },
];

const violationTypes = [
  { name: 'PAN Numbers', value: 35, color: '#ef4444' },
  { name: 'Email Addresses', value: 28, color: '#f59e0b' },
  { name: 'Phone Numbers', value: 22, color: '#3b82f6' },
  { name: 'Aadhaar Numbers', value: 15, color: '#10b981' },
];

const recentIncidents = [
  {
    id: 'INC-001',
    type: 'PAN Number',
    severity: 'High',
    channel: '#general',
    user: 'john.doe@company.com',
    time: '2 minutes ago',
    status: 'resolved'
  },
  {
    id: 'INC-002', 
    type: 'Email Address',
    severity: 'Medium',
    channel: 'Gmail',
    user: 'jane.smith@company.com',
    time: '15 minutes ago',
    status: 'open'
  },
  {
    id: 'INC-003',
    type: 'Phone Number',
    severity: 'Low',
    channel: '#support',
    user: 'bob.wilson@company.com',
    time: '1 hour ago',
    status: 'investigating'
  }
];

export function Dashboard() {
  const ackRate = 85;
  const overrideRate = 7;
  const riskReduction = 52;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">AI-powered communications safety overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nudge Acknowledgement Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{ackRate}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={ackRate} className="flex-1" />
              <span className="text-xs text-gray-500">Target: 80%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              +3% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Override Rate</CardTitle>
            <XCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overrideRate}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={overrideRate} className="flex-1" />
              <span className="text-xs text-gray-500">Target: ≤10%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              -2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{riskReduction}%</div>
            <div className="flex items-center space-x-2 mt-2">
              <Progress value={riskReduction} className="flex-1" />
              <span className="text-xs text-gray-500">Target: 50%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              vs baseline period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">1,247</div>
            <p className="text-xs text-gray-500 mt-1">
              Across 3 workspaces
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nudge Performance Trends</CardTitle>
            <CardDescription>Weekly acknowledgement and override rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ack" fill="#10b981" name="Acknowledged" />
                <Bar dataKey="override" fill="#f59e0b" name="Overridden" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Violation Types Distribution</CardTitle>
            <CardDescription>Most common sensitive data patterns detected</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={violationTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {violationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Latest policy violations requiring attention</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className={`h-5 w-5 ${
                      incident.severity === 'High' ? 'text-red-500' :
                      incident.severity === 'Medium' ? 'text-orange-500' : 'text-yellow-500'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium">{incident.id} - {incident.type}</div>
                    <div className="text-sm text-gray-500">
                      {incident.channel} • {incident.user}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={
                    incident.status === 'resolved' ? 'default' :
                    incident.status === 'investigating' ? 'secondary' : 'destructive'
                  }>
                    {incident.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {incident.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}