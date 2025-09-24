import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Plus, 
  Trash2, 
  AlertTriangle,
  Shield,
  TestTube,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Slider } from './ui/slider';

export function PolicyEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  
  const [policy, setPolicy] = useState({
    name: isNew ? '' : 'India DPDP - PII Protection',
    description: isNew ? '' : 'Detects and protects PAN, Aadhaar, and other Indian PII',
    category: isNew ? 'compliance' : 'compliance',
    scope: isNew ? 'global' : 'global',
    enforcement: isNew ? 'nudge' : 'soft_block',
    isActive: !isNew,
    rules: isNew ? [] : [
      {
        id: 'rule-1',
        name: 'PAN Number Detection',
        entityType: 'PAN Number',
        detectionMethod: 'regex',
        pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}',
        threshold: 0.9,
        enabled: true,
        suggestions: ['Mask with ****1234F', 'Replace with <PAN_REDACTED>']
      },
      {
        id: 'rule-2', 
        name: 'Aadhaar Number Detection',
        entityType: 'Aadhaar Number',
        detectionMethod: 'ml',
        pattern: '',
        threshold: 0.85,
        enabled: true,
        suggestions: ['Mask last 4 digits', 'Replace with <AADHAAR_REDACTED>']
      }
    ]
  });

  const [testMessage, setTestMessage] = useState('Hi team, customer details: PAN ABCDE1234F, Aadhaar 1234-5678-9012, email test@example.com');
  const [testResults, setTestResults] = useState(null);

  const addRule = () => {
    const newRule = {
      id: `rule-${Date.now()}`,
      name: '',
      entityType: '',
      detectionMethod: 'regex',
      pattern: '',
      threshold: 0.8,
      enabled: true,
      suggestions: []
    };
    setPolicy(prev => ({
      ...prev,
      rules: [...prev.rules, newRule]
    }));
  };

  const updateRule = (ruleId: string, updates: any) => {
    setPolicy(prev => ({
      ...prev,
      rules: prev.rules.map(rule => 
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    }));
  };

  const removeRule = (ruleId: string) => {
    setPolicy(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId)
    }));
  };

  const testPolicy = () => {
    // Simulate policy testing
    const mockResults = {
      violations: [
        {
          entityType: 'PAN Number',
          value: 'ABCDE1234F',
          confidence: 0.95,
          spans: [[33, 43]],
          suggestion: 'Mask with ****1234F'
        },
        {
          entityType: 'Aadhaar Number', 
          value: '1234-5678-9012',
          confidence: 0.89,
          spans: [[52, 66]],
          suggestion: 'Mask last 4 digits'
        }
      ],
      decision: policy.enforcement,
      severity: 85
    };
    setTestResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/policies">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Policies
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? 'Create New Policy' : 'Edit Policy'}
            </h1>
            <p className="text-gray-600">
              {isNew ? 'Define rules for detecting and protecting sensitive data' : 'Modify policy rules and settings'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline">
            <TestTube className="w-4 h-4 mr-2" />
            Test
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            {isNew ? 'Create Policy' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rules">Detection Rules</TabsTrigger>
          <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
          <TabsTrigger value="test">Test & Validate</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Policy Information</CardTitle>
              <CardDescription>Basic policy details and metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Policy Name</Label>
                  <Input
                    id="name"
                    value={policy.name}
                    onChange={(e) => setPolicy(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter policy name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={policy.category} 
                    onValueChange={(value) => setPolicy(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="privacy">Privacy</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={policy.description}
                  onChange={(e) => setPolicy(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this policy protects"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scope">Scope</Label>
                  <Select 
                    value={policy.scope} 
                    onValueChange={(value) => setPolicy(prev => ({ ...prev, scope: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global (All Users)</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={policy.isActive}
                    onCheckedChange={(checked) => setPolicy(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="active">Policy Active</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Detection Rules</CardTitle>
                <CardDescription>Configure what sensitive data patterns to detect</CardDescription>
              </div>
              <Button onClick={addRule}>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {policy.rules.map((rule, index) => (
                  <div key={rule.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Rule {index + 1}</span>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={(checked) => updateRule(rule.id, { enabled: checked })}
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeRule(rule.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Rule Name</Label>
                        <Input
                          value={rule.name}
                          onChange={(e) => updateRule(rule.id, { name: e.target.value })}
                          placeholder="Enter rule name"
                        />
                      </div>
                      <div>
                        <Label>Entity Type</Label>
                        <Select 
                          value={rule.entityType} 
                          onValueChange={(value) => updateRule(rule.id, { entityType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select entity type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PAN Number">PAN Number</SelectItem>
                            <SelectItem value="Aadhaar Number">Aadhaar Number</SelectItem>
                            <SelectItem value="Credit Card">Credit Card</SelectItem>
                            <SelectItem value="Email Address">Email Address</SelectItem>
                            <SelectItem value="Phone Number">Phone Number</SelectItem>
                            <SelectItem value="Bank Account">Bank Account</SelectItem>
                            <SelectItem value="API Key">API Key</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Detection Method</Label>
                        <Select 
                          value={rule.detectionMethod} 
                          onValueChange={(value) => updateRule(rule.id, { detectionMethod: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regex">Regular Expression</SelectItem>
                            <SelectItem value="ml">Machine Learning</SelectItem>
                            <SelectItem value="luhn">Luhn Algorithm</SelectItem>
                            <SelectItem value="pattern">Pattern Matching</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Confidence Threshold: {Math.round(rule.threshold * 100)}%</Label>
                        <Slider
                          value={[rule.threshold]}
                          onValueChange={([value]) => updateRule(rule.id, { threshold: value })}
                          max={1}
                          min={0.5}
                          step={0.05}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {rule.detectionMethod === 'regex' && (
                      <div>
                        <Label>Regular Expression Pattern</Label>
                        <Input
                          value={rule.pattern}
                          onChange={(e) => updateRule(rule.id, { pattern: e.target.value })}
                          placeholder="Enter regex pattern"
                          className="font-mono"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {policy.rules.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No detection rules configured</p>
                    <Button onClick={addRule} className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Rule
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enforcement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enforcement Settings</CardTitle>
              <CardDescription>Configure how violations are handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Default Enforcement Level</Label>
                <Select 
                  value={policy.enforcement} 
                  onValueChange={(value) => setPolicy(prev => ({ ...prev, enforcement: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nudge">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Nudge - Show warning, allow send</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="soft_block">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Soft Block - Require acknowledgment</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hard_block">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Hard Block - Prevent sending</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Enforcement Thresholds</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">Nudge</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Confidence ≥ 60%</p>
                      <Slider
                        value={[0.6]}
                        max={1}
                        min={0.3}
                        step={0.05}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="font-medium">Soft Block</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Confidence ≥ 80%</p>
                      <Slider
                        value={[0.8]}
                        max={1}
                        min={0.5}
                        step={0.05}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Hard Block</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Confidence ≥ 95%</p>
                      <Slider
                        value={[0.95]}
                        max={1}
                        min={0.7}
                        step={0.05}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Policy</CardTitle>
              <CardDescription>Validate your policy rules with sample content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="testMessage">Test Message</Label>
                <Textarea
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  rows={4}
                  placeholder="Enter message content to test against policy rules"
                />
              </div>
              
              <Button onClick={testPolicy}>
                <Play className="w-4 h-4 mr-2" />
                Run Test
              </Button>

              {testResults && (
                <div className="space-y-4">
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Test Results</h4>
                    
                    <Alert className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Policy would trigger <strong>{testResults.decision}</strong> with {testResults.violations.length} violations detected (severity: {testResults.severity}%)
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      {testResults.violations.map((violation, index) => (
                        <div key={index} className="border rounded p-3 bg-red-50 border-red-200">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-red-900">{violation.entityType}</div>
                            <Badge variant="outline" className="text-red-600 border-red-600">
                              {Math.round(violation.confidence * 100)}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-red-700 mt-1">
                            Detected: <code className="bg-red-100 px-1 rounded">{violation.value}</code>
                          </p>
                          <p className="text-sm text-red-600 mt-1">
                            Suggestion: {violation.suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}