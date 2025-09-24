import React, { useState } from 'react';
import { 
  Download, 
  Shield, 
  Building, 
  Globe,
  CheckCircle,
  Clock,
  Star,
  Users,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const policyPacks = [
  {
    id: 'dpdp-bfsi',
    name: 'India DPDP + BFSI Starter',
    description: 'Comprehensive coverage for Indian Digital Personal Data Protection and Banking regulations',
    category: 'compliance',
    region: 'India',
    version: '2.1',
    policies: 8,
    downloads: 1247,
    rating: 4.9,
    isRecommended: true,
    isInstalled: true,
    lastUpdated: '2024-01-18',
    includes: [
      'PAN Number Detection',
      'Aadhaar Number Protection', 
      'Banking Account Numbers',
      'IFSC Codes',
      'Credit Card Numbers',
      'Indian Phone Numbers',
      'Customer Email Addresses',
      'Financial Transaction IDs'
    ],
    compliance: ['DPDP Act 2023', 'RBI Guidelines', 'BFSI Standards']
  },
  {
    id: 'gdpr-global',
    name: 'Global GDPR Protection Pack',
    description: 'European data protection regulations and privacy controls',
    category: 'privacy',
    region: 'Global',
    version: '3.2',
    policies: 12,
    downloads: 2156,
    rating: 4.8,
    isRecommended: false,
    isInstalled: false,
    lastUpdated: '2024-01-15',
    includes: [
      'EU Personal Identifiers',
      'Email Address Protection',
      'Phone Number Detection',
      'IP Address Tracking',
      'IBAN/Credit Cards',
      'Biometric Data',
      'Health Information',
      'Location Data'
    ],
    compliance: ['GDPR Article 6', 'GDPR Article 9', 'Privacy by Design']
  },
  {
    id: 'healthcare-hipaa',
    name: 'Healthcare HIPAA Compliance',
    description: 'Protected Health Information (PHI) detection and compliance',
    category: 'healthcare',
    region: 'US',
    version: '1.8',
    policies: 6,
    downloads: 543,
    rating: 4.7,
    isRecommended: false,
    isInstalled: false,
    lastUpdated: '2024-01-12',
    includes: [
      'Medical Record Numbers',
      'Social Security Numbers',
      'Health Plan IDs',
      'Medical Device IDs',
      'Patient Names & DOB',
      'Healthcare Provider IDs'
    ],
    compliance: ['HIPAA Privacy Rule', 'HIPAA Security Rule', 'HITECH Act']
  },
  {
    id: 'security-secrets',
    name: 'Developer Security Pack',
    description: 'API keys, tokens, secrets, and source code protection',
    category: 'security',
    region: 'Global',
    version: '1.5',
    policies: 15,
    downloads: 892,
    rating: 4.6,
    isRecommended: false,
    isInstalled: false,
    lastUpdated: '2024-01-20',
    includes: [
      'AWS Access Keys',
      'GCP Service Accounts', 
      'Azure Connection Strings',
      'Database Credentials',
      'JWT Tokens',
      'SSH Private Keys',
      'Source Code Snippets',
      'Docker Secrets'
    ],
    compliance: ['SOC 2', 'ISO 27001', 'NIST Framework']
  }
];

export function PolicyPacks() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPacks = selectedCategory === 'all' 
    ? policyPacks 
    : policyPacks.filter(pack => pack.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'privacy': return <Globe className="w-4 h-4" />;
      case 'healthcare': return <Building className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliance': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'privacy': return 'text-green-600 bg-green-50 border-green-200';
      case 'healthcare': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'security': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Packs</h1>
          <p className="text-gray-600">Pre-built compliance templates for common regulations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            1 Pack Installed
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Packs</p>
                <p className="text-2xl font-bold">{policyPacks.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Installed</p>
                <p className="text-2xl font-bold text-green-600">
                  {policyPacks.filter(p => p.isInstalled).length}
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
                <p className="text-sm text-gray-600">Total Policies</p>
                <p className="text-2xl font-bold text-purple-600">
                  {policyPacks.reduce((sum, pack) => sum + pack.policies, 0)}
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
                <p className="text-sm text-gray-600">Community</p>
                <p className="text-2xl font-bold text-orange-600">
                  {policyPacks.reduce((sum, pack) => sum + pack.downloads, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All Packs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPacks.map((pack) => (
              <Card key={pack.id} className={`relative ${pack.isRecommended ? 'ring-2 ring-blue-500' : ''}`}>
                {pack.isRecommended && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-blue-600">
                      <Star className="w-3 h-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {getCategoryIcon(pack.category)}
                        <span>{pack.name}</span>
                      </CardTitle>
                      <CardDescription className="mt-1">{pack.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{pack.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Badge variant="outline" className={getCategoryColor(pack.category)}>
                      {pack.category}
                    </Badge>
                    <span>{pack.region}</span>
                    <span>v{pack.version}</span>
                    <span>{pack.policies} policies</span>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Includes:</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                      {pack.includes.slice(0, 6).map((item, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                      {pack.includes.length > 6 && (
                        <div className="text-gray-500">
                          +{pack.includes.length - 6} more...
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Compliance Standards:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pack.compliance.map((standard, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Download className="w-4 h-4" />
                      <span>{pack.downloads.toLocaleString()} downloads</span>
                    </div>
                    
                    {pack.isInstalled ? (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Installed
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    ) : (
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Install Pack
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Installation Progress */}
      {policyPacks.some(p => p.isInstalled) && (
        <Card>
          <CardHeader>
            <CardTitle>Installed Packs</CardTitle>
            <CardDescription>Manage your currently installed policy packs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyPacks.filter(p => p.isInstalled).map((pack) => (
                <div key={pack.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(pack.category)}
                      <span className="font-medium">{pack.name}</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      v{pack.version}
                    </Badge>
                    <span className="text-sm text-gray-500">{pack.policies} policies active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Update Available
                    </Button>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}