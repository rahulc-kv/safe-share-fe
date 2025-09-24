import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Shield,
  User,
  Settings,
  FileText,
  AlertTriangle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback } from './ui/avatar';

const auditLogs = [
  {
    id: 'LOG-001',
    timestamp: '2024-01-20T14:35:22Z',
    actor: 'john.doe@company.com',
    action: 'policy_created',
    target: 'India DPDP - Enhanced PII Protection',
    targetType: 'policy',
    targetId: 'POL-005',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    details: {
      changes: ['Added Aadhaar detection rule', 'Updated enforcement to soft_block'],
      severity: 'medium'
    },
    status: 'success'
  },
  {
    id: 'LOG-002',
    timestamp: '2024-01-20T14:30:15Z',
    actor: 'jane.smith@company.com',
    action: 'incident_resolved',
    target: 'INC-123',
    targetType: 'incident',
    targetId: 'INC-123',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: {
      resolution: 'User acknowledged violation and applied safe fix',
      timeToResolve: '5 minutes'
    },
    status: 'success'
  },
  {
    id: 'LOG-003',
    timestamp: '2024-01-20T14:25:08Z',
    actor: 'system',
    action: 'connector_health_check',
    target: 'Slack Enterprise Connector',
    targetType: 'connector',
    targetId: 'CONN-001',
    ipAddress: '10.0.0.50',
    userAgent: 'SafeShare-Agent/1.0',
    details: {
      status: 'healthy',
      responseTime: '145ms',
      coverage: '95%'
    },
    status: 'success'
  },
  {
    id: 'LOG-004',
    timestamp: '2024-01-20T14:18:33Z',
    actor: 'admin@company.com',
    action: 'user_role_changed',
    target: 'bob.wilson@company.com',
    targetType: 'user',
    targetId: 'USR-003',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    details: {
      oldRole: 'user',
      newRole: 'analyst',
      reason: 'Promoted to security team'
    },
    status: 'success'
  },
  {
    id: 'LOG-005',
    timestamp: '2024-01-20T14:12:45Z',
    actor: 'system',
    action: 'authentication_failed',
    target: 'unknown@company.com',
    targetType: 'authentication',
    targetId: null,
    ipAddress: '203.0.113.42',
    userAgent: 'curl/7.68.0',
    details: {
      reason: 'Invalid credentials',
      attemptCount: 3,
      blocked: false
    },
    status: 'warning'
  },
  {
    id: 'LOG-006',
    timestamp: '2024-01-20T14:05:17Z',
    actor: 'charlie.davis@company.com',
    action: 'report_generated',
    target: 'Monthly Compliance Report - January 2024',
    targetType: 'report',
    targetId: 'RPT-012',
    ipAddress: '192.168.1.108',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    details: {
      reportType: 'compliance_summary',
      format: 'PDF',
      size: '2.4 MB'
    },
    status: 'success'
  }
];

const actionTypes = [
  'all',
  'policy_created',
  'policy_updated',
  'incident_created',
  'incident_resolved',
  'user_login',
  'user_logout',
  'user_role_changed',
  'connector_added',
  'connector_health_check',
  'report_generated',
  'data_export',
  'authentication_failed'
];

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('last-24-hours');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getActionIcon = (action: string) => {
    if (action.includes('policy')) return <Shield className="w-4 h-4" />;
    if (action.includes('user') || action.includes('authentication')) return <User className="w-4 h-4" />;
    if (action.includes('connector')) return <Settings className="w-4 h-4" />;
    if (action.includes('report') || action.includes('export')) return <FileText className="w-4 h-4" />;
    if (action.includes('incident')) return <AlertTriangle className="w-4 h-4" />;
    return <Eye className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatAction = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Complete audit trail of system activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events (24h)</p>
                <p className="text-2xl font-bold">{auditLogs.length}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful Actions</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditLogs.filter(log => log.status === 'success').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {auditLogs.filter(log => log.status === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Users</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(auditLogs.filter(log => log.actor !== 'system').map(log => log.actor)).size}
                </p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Audit Logs</CardTitle>
          <CardDescription>Search and filter audit events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {actionTypes.slice(1).map(action => (
                  <SelectItem key={action} value={action}>{formatAction(action)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-hour">Last Hour</SelectItem>
                <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Custom Date
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Events</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {auditLogs.length} events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {log.actor === 'system' ? (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <Settings className="w-3 h-3 text-blue-600" />
                        </div>
                      ) : (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {log.actor.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-sm">
                        {log.actor === 'system' ? 'System' : log.actor}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.action)}
                      <span>{formatAction(log.action)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{log.target}</div>
                      {log.targetId && (
                        <div className="text-xs text-gray-500">{log.targetId}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-600">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Log Details Modal would go here */}
    </div>
  );
}