import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Copy, 
  Trash2,
  Shield,
  Globe,
  Building,
  MoreHorizontal,
  Play,
  Pause
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Switch } from './ui/switch';

const policies = [
  {
    id: 'POL-001',
    name: 'India DPDP - PII Protection',
    description: 'Detects and protects PAN, Aadhaar, and other Indian PII',
    status: 'active',
    version: '1.2',
    lastModified: '2024-01-15T10:30:00Z',
    modifiedBy: 'admin@company.com',
    enforcement: 'soft_block',
    category: 'compliance',
    scope: 'global',
    incidents: 23,
    rules: [
      { type: 'PAN Number', pattern: 'regex', threshold: 0.9 },
      { type: 'Aadhaar Number', pattern: 'ml', threshold: 0.85 },
      { type: 'Indian Phone', pattern: 'regex', threshold: 0.8 }
    ]
  },
  {
    id: 'POL-002',
    name: 'BFSI Financial Data Protection',
    description: 'Banking and financial services data compliance',
    status: 'active',
    version: '2.1',
    lastModified: '2024-01-18T14:22:00Z',
    modifiedBy: 'compliance@company.com',
    enforcement: 'hard_block',
    category: 'financial',
    scope: 'department',
    incidents: 8,
    rules: [
      { type: 'Credit Card', pattern: 'luhn', threshold: 0.95 },
      { type: 'Bank Account', pattern: 'regex', threshold: 0.9 },
      { type: 'IFSC Code', pattern: 'regex', threshold: 0.85 }
    ]
  },
  {
    id: 'POL-003',
    name: 'Customer Contact Information',
    description: 'Protects customer emails and phone numbers',
    status: 'active',
    version: '1.0',
    lastModified: '2024-01-10T09:15:00Z',
    modifiedBy: 'privacy@company.com',
    enforcement: 'nudge',
    category: 'privacy',
    scope: 'global',
    incidents: 45,
    rules: [
      { type: 'Email Address', pattern: 'regex', threshold: 0.8 },
      { type: 'Phone Number', pattern: 'regex', threshold: 0.75 }
    ]
  },
  {
    id: 'POL-004',
    name: 'Code & Secrets Protection',
    description: 'Detects API keys, tokens, and source code',
    status: 'draft',
    version: '0.5',
    lastModified: '2024-01-20T16:45:00Z',
    modifiedBy: 'security@company.com',
    enforcement: 'hard_block',
    category: 'security',
    scope: 'department',
    incidents: 0,
    rules: [
      { type: 'AWS Access Key', pattern: 'regex', threshold: 0.95 },
      { type: 'GCP Token', pattern: 'regex', threshold: 0.95 },
      { type: 'Source Code', pattern: 'ml', threshold: 0.7 }
    ]
  }
];

export function PoliciesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || policy.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'draft': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'archived': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEnforcementColor = (enforcement: string) => {
    switch (enforcement) {
      case 'hard_block': return 'text-red-600 bg-red-50 border-red-200';
      case 'soft_block': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'nudge': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'financial': return <Building className="w-4 h-4" />;
      case 'privacy': return <Globe className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policies</h1>
          <p className="text-gray-600">Manage data protection and compliance policies</p>
        </div>
        <Button asChild>
          <Link to="/policies/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Policy
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Policies</p>
                <p className="text-2xl font-bold">{policies.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {policies.filter(p => p.status === 'active').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Play className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {policies.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Pause className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-purple-600">
                  {policies.filter(p => {
                    const lastWeek = new Date();
                    lastWeek.setDate(lastWeek.getDate() - 7);
                    return new Date(p.lastModified) > lastWeek;
                  }).length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Policies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>
            Showing {filteredPolicies.length} of {policies.length} policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enforcement</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Incidents</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <div>
                      <Link 
                        to={`/policies/${policy.id}`}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {policy.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{policy.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(policy.category)}
                      <span className="capitalize">{policy.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(policy.status)}>
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getEnforcementColor(policy.enforcement)}>
                      {policy.enforcement.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{policy.version}</TableCell>
                  <TableCell>
                    <span className={policy.incidents > 0 ? 'text-red-600' : 'text-gray-500'}>
                      {policy.incidents}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(policy.lastModified).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/policies/${policy.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/policies/${policy.id}`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}