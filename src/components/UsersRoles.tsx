import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Crown,
  Shield,
  Eye,
  Users,
  UserCheck,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'software_engineer',
    department: 'Engineering',
    status: 'active',
    lastLogin: '2024-01-20T14:30:00Z',
    violations: {critical: 3, low: 2},
    avatar: null
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'senior_software_engineer',
    department: 'Engineering',
    status: 'active',
    lastLogin: '2024-01-20T09:15:00Z',
    violations: {critical: 0, low: 0},
    avatar: null
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob.wilson@company.com',
    role: 'analyst',
    department: 'Security',
    status: 'active',
    lastLogin: '2024-01-19T16:45:00Z',
    violations: {critical: 1, low: 0},
    avatar: null
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    role: 'test_engineer',
    department: 'Security',
    status: 'inactive',
    lastLogin: '2024-01-15T10:20:00Z',
    violations: {critical: 7, low: 0},
    avatar: null
  },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie.davis@company.com',
    role: 'auditor',
    department: 'Compliance',
    status: 'active',
    lastLogin: '2024-01-20T11:30:00Z',
    violations: {critical: 0, low: 0},
    avatar: null
  }
];

const roles = [
  {
    id: 'software_engineer',
    name: 'Software Engineer',
    description: 'Software engineering role',
    permissions: [
      'View incidents',
      'Investigate violations',
      'Add case notes',
      'Export incident data',
      'Dashboard access'
    ],
    userCount: 1,
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },  
  {
    id: 'senior_software_engineer',
    name: 'Senior Software Engineer',
    description: 'Senior software engineering role',
    permissions: [
      'View incidents',
      'Investigate violations',
    ]},
  {
    id: 'org_admin',
    name: 'Organization Admin',
    description: 'Full system access and user management',
    permissions: [
      'Manage all policies',
      'Configure connectors',
      'User administration',
      'System settings',
      'Audit log access',
      'Export data'
    ],
    userCount: 1,
    color: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'compliance_admin',
    name: 'Compliance Admin',
    description: 'Policy management and incident oversight',
    permissions: [
      'Create/edit policies',
      'View all incidents',
      'Generate reports',
      'Manage policy packs',
      'Override decisions'
    ],
    userCount: 1,
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  },
  {
    id: 'analyst',
    name: 'Security Analyst',
    description: 'Incident investigation and monitoring',
    permissions: [
      'View incidents',
      'Investigate violations',
      'Add case notes',
      'Export incident data',
      'Dashboard access'
    ],
    userCount: 1,
    color: 'text-green-600 bg-green-50 border-green-200'
  },
  {
    id: 'auditor',
    name: 'Auditor',
    description: 'Read-only access for compliance review',
    permissions: [
      'View audit logs',
      'Generate compliance reports',
      'Export evidence',
      'Read-only incident access'
    ],
    userCount: 1,
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  {
    id: 'user',
    name: 'End User',
    description: 'Standard user with basic protections',
    permissions: [
      'Receive nudges',
      'Override with justification',
      'View own violations'
    ],
    userCount: 1200,
    color: 'text-gray-600 bg-gray-50 border-gray-200'
  },
  {
    id: 'test_engineer',
    name: 'Test Engineer',
    description: 'Test engineer role',
    permissions: [
      'View incidents',
      'Investigate violations',
      'Add case notes',
      'Export incident data',
      'Dashboard access'
    ],
    userCount: 1200,
    color: 'text-gray-600 bg-gray-50 border-gray-200'
  }
];

export function UsersRoles() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleInfo = (roleId: string) => {
    return roles.find(r => r.id === roleId);
  };

  // const getRoleIcon = (roleId: string) => {
  //   switch (roleId) {
  //     case 'org_admin': return <Crown className="w-4 h-4" />;
  //     case 'compliance_admin': return <Shield className="w-4 h-4" />;
  //     case 'analyst': return <Eye className="w-4 h-4" />;
  //     case 'auditor': return <UserCheck className="w-4 h-4" />;
  //     default: return <Users className="w-4 h-4" />;
  //   }
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          {/* <p className="text-gray-600">Manage user access and role-based permissions</p> */}
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            SSO Settings
          </Button> */}
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Roles</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.role.includes('admin')).length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent Logins</p>
                <p className="text-2xl font-bold text-orange-600">
                  {users.filter(u => {
                    const lastWeek = new Date();
                    lastWeek.setDate(lastWeek.getDate() - 7);
                    return new Date(u.lastLogin) > lastWeek;
                  }).length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div> */}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="settings">SSO & Settings</TabsTrigger>
        </TabsList> */}

        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select> */}
                
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>
                Showing {filteredUsers.length} of {users.length} users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    {/* <TableHead>Status</TableHead> */}
                    <TableHead>Last Incident</TableHead>
                    <TableHead>Violations</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const roleInfo = getRoleInfo(user.role);
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {roleInfo && (
                            <Badge variant="outline" className={roleInfo.color}>
                              <div className="flex items-center space-x-1">
                                {/* {getRoleIcon(user.role)} */}
                                <span>{roleInfo.name}</span>
                              </div>
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        {/* <TableCell>
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell> */}
                        <TableCell className="text-gray-600">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={'text-red-600 pr-8'}>
                            {user.violations.critical}
                          </span>
                          <span className={'text-orange-500'}>
                            {user.violations.low}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {/* {getRoleIcon(role.id)} */}
                      <CardTitle>{role.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={role.color}>
                      {role.userCount} {role.userCount === 1 ? 'user' : 'users'}
                    </Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Permissions</h4>
                    <div className="space-y-1">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm text-gray-500">
                      {role.id === 'user' ? 'Automatically assigned' : 'Manual assignment'}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      {role.id !== 'user' && role.id !== 'org_admin' && (
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SSO Configuration</CardTitle>
              <CardDescription>Single Sign-On and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">SAML Authentication</label>
                  <p className="text-sm text-gray-500">Enable SAML 2.0 single sign-on</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">OIDC Authentication</label>
                  <p className="text-sm text-gray-500">Enable OpenID Connect authentication</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">Automatic User Provisioning</label>
                  <p className="text-sm text-gray-500">Create users automatically on first login</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
              <CardDescription>Configure user lifecycle and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-sm">Default Role for New Users</label>
                  <Select defaultValue="user">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.filter(r => r.id !== 'org_admin').map(role => (
                        <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="font-medium text-sm">Session Timeout (hours)</label>
                  <Select defaultValue="8">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}