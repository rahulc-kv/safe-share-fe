import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  ExternalLink,
  Shield,
  Users,
  Calendar,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const connectors = [
  {
    id: 'slack-enterprise',
    name: 'Slack Enterprise',
    type: 'workspace',
    status: 'connected',
    lastSync: '2024-01-20T14:30:00Z',
    health: 'healthy',
    coverage: 95,
    users: 1247,
    channels: 45,
    permissions: [
      'Read channel messages',
      'Send direct messages',
      'Access user profiles',
      'Admin message management'
    ],
    settings: {
      realTimeMonitoring: true,
      serverJIT: true,
      extensionRequired: false
    }
  },
  {
    id: 'gmail-domain',
    name: 'Gmail (Domain-wide)',
    type: 'email',
    status: 'connected',
    lastSync: '2024-01-20T14:25:00Z',
    health: 'warning',
    coverage: 78,
    users: 856,
    channels: null,
    permissions: [
      'Read compose drafts',
      'Send on behalf (delegate)',
      'Access sent items',
      'Domain admin access'
    ],
    settings: {
      realTimeMonitoring: false,
      serverJIT: false,
      extensionRequired: true
    }
  },
  {
    id: 'teams-enterprise',
    name: 'Microsoft Teams',
    type: 'workspace',
    status: 'pending',
    lastSync: null,
    health: 'setup',
    coverage: 0,
    users: 0,
    channels: 0,
    permissions: [
      'Read chat messages',
      'Send notifications',
      'Access team members',
      'Channel management'
    ],
    settings: {
      realTimeMonitoring: false,
      serverJIT: false,
      extensionRequired: true
    }
  },
  {
    id: 'outlook-exchange',
    name: 'Outlook / Exchange',
    type: 'email',
    status: 'error',
    lastSync: '2024-01-19T09:15:00Z',
    health: 'error',
    coverage: 0,
    users: 0,
    channels: null,
    permissions: [
      'Read mailbox items',
      'Send emails',
      'Access calendar',
      'Exchange admin rights'
    ],
    settings: {
      realTimeMonitoring: false,
      serverJIT: false,
      extensionRequired: true
    }
  }
];

const availableConnectors = [
  {
    id: 'zoom-meetings',
    name: 'Zoom Meetings',
    type: 'meeting',
    description: 'Monitor meeting recordings and transcripts',
    status: 'available',
    comingSoon: false
  },
  {
    id: 'jira-atlassian',
    name: 'Jira / Confluence',
    type: 'productivity',
    description: 'Scan tickets, comments, and documents',
    status: 'available', 
    comingSoon: false
  },
  {
    id: 'salesforce-crm',
    name: 'Salesforce CRM',
    type: 'crm',
    description: 'Protect customer data in CRM fields',
    status: 'coming-soon',
    comingSoon: true
  }
];

export function Connectors() {
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'setup': return <Settings className="w-5 h-5 text-gray-600" />;
      default: return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConnectorIcon = (type: string) => {
    switch (type) {
      case 'workspace': return '💬';
      case 'email': return '✉️';
      case 'meeting': return '📹';
      case 'productivity': return '📋';
      case 'crm': return '🏢';
      default: return '🔗';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Connectors</h1>
          <p className="text-gray-600">Connect communication tools and manage data sources</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Connector
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-green-600">
                  {connectors.filter(c => c.status === 'connected').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Protected Users</p>
                <p className="text-2xl font-bold text-blue-600">
                  {connectors.filter(c => c.status === 'connected').reduce((sum, c) => sum + c.users, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coverage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(connectors.filter(c => c.status === 'connected').reduce((sum, c) => sum + c.coverage, 0) / connectors.filter(c => c.status === 'connected').length) || 0}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Health Issues</p>
                <p className="text-2xl font-bold text-red-600">
                  {connectors.filter(c => c.health === 'error' || c.health === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Alerts */}
      {connectors.some(c => c.health === 'error' || c.health === 'warning') && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Some connectors need attention. Check the status below for details.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Connectors</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectors.map((connector) => (
              <Card key={connector.id} className={selectedConnector === connector.id ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getConnectorIcon(connector.type)}</div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{connector.name}</span>
                          {getHealthIcon(connector.health)}
                        </CardTitle>
                        <CardDescription>
                          {connector.type === 'workspace' ? 'Communication Platform' : 'Email Service'}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(connector.status)}>
                      {connector.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {connector.status === 'connected' && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="font-medium text-gray-500">Coverage</label>
                        <div className="mt-1">
                          <Progress value={connector.coverage} className="h-2" />
                          <span className="text-xs text-gray-500">{connector.coverage}% of users</span>
                        </div>
                      </div>
                      <div>
                        <label className="font-medium text-gray-500">Users Protected</label>
                        <div className="mt-1 font-medium">{connector.users.toLocaleString()}</div>
                      </div>
                    </div>
                  )}

                  {connector.status === 'error' && (
                    <Alert>
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>
                        Connection failed. Check permissions and retry authentication.
                      </AlertDescription>
                    </Alert>
                  )}

                  {connector.status === 'pending' && (
                    <Alert>
                      <Settings className="h-4 w-4" />
                      <AlertDescription>
                        Setup in progress. Complete OAuth flow to activate.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <h4 className="font-medium text-sm mb-2">Permissions</h4>
                    <div className="space-y-1">
                      {connector.permissions.slice(0, 3).map((permission, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-gray-600">{permission}</span>
                        </div>
                      ))}
                      {connector.permissions.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{connector.permissions.length - 3} more permissions
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-gray-500">
                      {connector.lastSync ? (
                        <>
                          Last sync: {new Date(connector.lastSync).toLocaleString()}
                        </>
                      ) : (
                        'Never synchronized'
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {connector.status === 'connected' && (
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        {connector.status === 'pending' ? 'Complete Setup' : 'Configure'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {availableConnectors.map((connector) => (
              <Card key={connector.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getConnectorIcon(connector.type)}</div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{connector.name}</span>
                        {connector.comingSoon && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            Coming Soon
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{connector.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {connector.type === 'meeting' ? 'Meeting Platform' :
                       connector.type === 'productivity' ? 'Productivity Suite' :
                       connector.type === 'crm' ? 'CRM System' : 'Integration'}
                    </div>
                    
                    <Button 
                      variant={connector.comingSoon ? "outline" : "default"}
                      size="sm"
                      disabled={connector.comingSoon}
                    >
                      {connector.comingSoon ? (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          Notify Me
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Connector Settings</CardTitle>
              <CardDescription>Configure default behavior for all connectors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Real-time Monitoring</label>
                  <p className="text-sm text-gray-500">Enable live message scanning as users type</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Server JIT Fallback</label>
                  <p className="text-sm text-gray-500">Use server-side processing when browser extension unavailable</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Auto-retry Failed Connections</label>
                  <p className="text-sm text-gray-500">Automatically attempt to reconnect failed integrations</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Enhanced Logging</label>
                  <p className="text-sm text-gray-500">Collect detailed logs for troubleshooting (may impact performance)</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Monitoring</CardTitle>
              <CardDescription>Configure connector health checks and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-sm">Health Check Interval</label>
                  <select className="mt-1 w-full p-2 border rounded-md">
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Hourly</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-sm">Alert Threshold</label>
                  <select className="mt-1 w-full p-2 border rounded-md">
                    <option>First failure</option>
                    <option>After 3 failures</option>
                    <option>After 5 failures</option>
                    <option>After 10 failures</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}