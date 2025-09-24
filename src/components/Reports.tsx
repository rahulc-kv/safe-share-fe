import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  Filter, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DatePickerWithRange } from './ui/date-range-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const predefinedReports = [
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'High-level overview of compliance metrics and trends',
    category: 'executive',
    frequency: 'monthly',
    lastGenerated: '2024-01-15T10:00:00Z',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: 'incident-details',
    name: 'Detailed Incident Report',
    description: 'Comprehensive incident analysis with evidence',
    category: 'compliance',
    frequency: 'weekly',
    lastGenerated: '2024-01-20T09:30:00Z',
    size: '5.7 MB',
    format: 'PDF + CSV'
  },
  {
    id: 'policy-effectiveness',
    name: 'Policy Effectiveness Analysis',
    description: 'Policy performance and optimization recommendations',
    category: 'analytics',
    frequency: 'quarterly',
    lastGenerated: '2024-01-01T00:00:00Z',
    size: '3.1 MB',
    format: 'PDF'
  },
  {
    id: 'user-training',
    name: 'User Training Report',
    description: 'User behavior analysis and training needs assessment',
    category: 'training',
    frequency: 'monthly',
    lastGenerated: '2024-01-18T14:20:00Z',
    size: '1.8 MB',
    format: 'PDF'
  },
  {
    id: 'audit-trail',
    name: 'Audit Trail Export',
    description: 'Complete audit log export for compliance review',
    category: 'audit',
    frequency: 'on-demand',
    lastGenerated: '2024-01-19T16:45:00Z',
    size: '12.3 MB',
    format: 'CSV'
  }
];

const trendData = [
  { month: 'Oct', incidents: 45, acknowledged: 38, overrides: 7 },
  { month: 'Nov', incidents: 52, acknowledged: 44, overrides: 8 },
  { month: 'Dec', incidents: 38, acknowledged: 32, overrides: 6 },
  { month: 'Jan', incidents: 41, acknowledged: 35, overrides: 6 },
];

const policyData = [
  { name: 'PAN Numbers', violations: 35, color: '#ef4444' },
  { name: 'Email Addresses', violations: 28, color: '#f59e0b' },
  { name: 'Phone Numbers', violations: 22, color: '#3b82f6' },
  { name: 'Aadhaar Numbers', violations: 15, color: '#10b981' },
];

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('last-30-days');
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'executive': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'compliance': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'analytics': return 'text-green-600 bg-green-50 border-green-200';
      case 'training': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'audit': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'executive': return <TrendingUp className="w-4 h-4" />;
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'training': return <Users className="w-4 h-4" />;
      case 'audit': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate compliance reports and analyze trends</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold">{predefinedReports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Automated</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Export</p>
                <p className="text-2xl font-bold text-orange-600">24.7 MB</p>
              </div>
              <Download className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Analytics Dashboard</TabsTrigger>
          <TabsTrigger value="predefined">Predefined Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="exports">Data Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Report Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Customize your analytics view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 days</SelectItem>
                    <SelectItem value="this-year">This year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
                
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Trends</CardTitle>
                <CardDescription>Monthly violation patterns and user response</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Incidents" />
                    <Line type="monotone" dataKey="acknowledged" stroke="#10b981" strokeWidth={2} name="Acknowledged" />
                    <Line type="monotone" dataKey="overrides" stroke="#f59e0b" strokeWidth={2} name="Overrides" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Violation Distribution</CardTitle>
                <CardDescription>Most common policy violations by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={policyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="violations"
                      label={({ name, violations }) => `${name}: ${violations}`}
                    >
                      {policyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* KPI Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Current period compliance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nudge Acknowledgement Rate</span>
                    <span className="text-sm font-bold text-green-600">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500">Target: 80% • +3% from last month</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Override Rate</span>
                    <span className="text-sm font-bold text-orange-600">7%</span>
                  </div>
                  <Progress value={7} className="h-2" />
                  <p className="text-xs text-gray-500">Target: ≤10% • -2% from last month</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Risk Reduction</span>
                    <span className="text-sm font-bold text-blue-600">52%</span>
                  </div>
                  <Progress value={52} className="h-2" />
                  <p className="text-xs text-gray-500">Target: 50% • +2% from baseline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predefined" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {predefinedReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(report.category)}
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-500">Frequency</label>
                      <div className="mt-1 capitalize">{report.frequency}</div>
                    </div>
                    <div>
                      <label className="font-medium text-gray-500">Format</label>
                      <div className="mt-1">{report.format}</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="font-medium text-gray-500">Last Generated</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <span>{new Date(report.lastGenerated).toLocaleDateString()}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{report.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create tailored reports for specific compliance needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incident-summary">Incident Summary</SelectItem>
                      <SelectItem value="policy-analysis">Policy Analysis</SelectItem>
                      <SelectItem value="user-behavior">User Behavior</SelectItem>
                      <SelectItem value="compliance-status">Compliance Status</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Time Period</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Include Sections</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Executive Summary',
                    'Incident Details',
                    'Policy Performance',
                    'User Statistics',
                    'Trend Analysis',
                    'Recommendations'
                  ].map((section) => (
                    <label key={section} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Custom Report
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Export Center</CardTitle>
              <CardDescription>Export raw data for external analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data to export" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incidents">Incident Data</SelectItem>
                      <SelectItem value="policies">Policy Configuration</SelectItem>
                      <SelectItem value="users">User Activity</SelectItem>
                      <SelectItem value="audit-logs">Audit Logs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Export Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Data Privacy Notice</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Exported data may contain sensitive information. Ensure compliance with your organization's data handling policies before downloading.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>Download history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Incident Data - January 2024', date: '2024-01-20', size: '2.1 MB', format: 'CSV', status: 'completed' },
                  { name: 'Audit Logs - Q4 2023', date: '2024-01-15', size: '8.7 MB', format: 'JSON', status: 'completed' },
                  { name: 'Policy Configuration Export', date: '2024-01-10', size: '456 KB', format: 'JSON', status: 'completed' }
                ].map((exportItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{exportItem.name}</div>
                      <div className="text-sm text-gray-500">
                        {exportItem.date} • {exportItem.size} • {exportItem.format}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {exportItem.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}