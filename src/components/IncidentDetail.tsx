import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  User, 
  Clock, 
  FileText, 
  Download,
  Eye,
  Copy,
  Shield,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

export function IncidentDetail() {
  const { id } = useParams();
  const [notes, setNotes] = useState('');
  
  // Mock incident data - in real app would fetch by ID
  const incident = {
    id: 'INC-001',
    timestamp: '2024-01-20T14:30:00Z',
    severity: 'High',
    confidence: 0.95,
    violationType: 'PAN Number',
    channel: '#general',
    user: {
      email: 'john.doe@company.com',
      name: 'John Doe',
      department: 'Sales'
    },
    policy: {
      id: 'POL-001',
      name: 'India DPDP - PII Protection',
      version: '1.2'
    },
    status: 'resolved',
    decision: 'soft_block',
    hasOverride: false,
    originalMessage: 'Hi team, I need to process this customer application. Their details are: PAN ABCDE1234F, email customer@example.com, and they mentioned their Aadhaar number during the call.',
    detectedEntities: [
      {
        type: 'PAN Number',
        value: 'ABCDE1234F',
        spans: [[86, 96]],
        confidence: 0.95,
        suggestion: 'Replace with ****1234F'
      },
      {
        type: 'Email',
        value: 'customer@example.com',
        spans: [[104, 123]],
        confidence: 0.89,
        suggestion: 'Replace with c****@example.com'
      }
    ],
    timeline: [
      {
        timestamp: '2024-01-20T14:30:00Z',
        action: 'Message intercepted',
        actor: 'System',
        details: 'Detected 2 policy violations'
      },
      {
        timestamp: '2024-01-20T14:30:15Z',
        action: 'Soft block applied',
        actor: 'System',
        details: 'User shown safe sending options'
      },
      {
        timestamp: '2024-01-20T14:31:22Z',
        action: 'Safe version sent',
        actor: 'john.doe@company.com',
        details: 'User applied suggested masking'
      },
      {
        timestamp: '2024-01-20T14:31:30Z',
        action: 'Incident resolved',
        actor: 'System',
        details: 'No policy violations in final message'
      }
    ]
  };

  const highlightEntities = (text: string, entities: any[]) => {
    let result = text;
    let offset = 0;
    
    // Sort entities by span start position (descending) to avoid offset issues
    const sortedEntities = [...entities].sort((a, b) => b.spans[0][0] - a.spans[0][0]);
    
    sortedEntities.forEach((entity, index) => {
      const [start, end] = entity.spans[0];
      const before = result.slice(0, start);
      const highlighted = result.slice(start, end);
      const after = result.slice(end);
      
      result = before + `<mark class="bg-red-100 text-red-900 px-1 rounded">${highlighted}</mark>` + after;
    });
    
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/incidents">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Incidents
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Incident {incident.id}</h1>
            <p className="text-gray-600">Policy violation details and evidence</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Evidence
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Incident Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Severity</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">
                      {incident.severity}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Confidence</label>
                  <div className="mt-1 text-sm">{Math.round(incident.confidence * 100)}%</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Violation Type</label>
                  <div className="mt-1 text-sm">{incident.violationType}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Channel</label>
                  <div className="mt-1">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {incident.channel}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Original Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <span>Original Message</span>
              </CardTitle>
              <CardDescription>Message content with detected violations highlighted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div 
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightEntities(incident.originalMessage, incident.detectedEntities)
                  }}
                />
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">Detected Violations:</h4>
                {incident.detectedEntities.map((entity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">{entity.type}</span>
                      <span className="text-sm text-gray-600">({Math.round(entity.confidence * 100)}% confidence)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Suggested: {entity.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>Incident Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incident.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {event.action.includes('resolved') ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : event.actor === 'System' ? (
                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                      ) : (
                        <User className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{event.action}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{event.details}</p>
                      <p className="text-xs text-gray-400">by {event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">Resolved</span>
              </div>
              <p className="text-sm text-gray-600">
                User applied safe sending recommendations. No policy violations in final message.
              </p>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>User Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="mt-1 text-sm">{incident.user.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <div className="mt-1 text-sm">{incident.user.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Department</label>
                  <div className="mt-1 text-sm">{incident.user.department}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Policy Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Policy Name</label>
                  <div className="mt-1 text-sm">{incident.policy.name}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Version</label>
                  <div className="mt-1 text-sm">{incident.policy.version}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Decision</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">
                      {incident.decision.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto" asChild>
                <Link to={`/policies/${incident.policy.id}`}>
                  <Eye className="w-4 h-4 mr-1" />
                  View Policy
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Investigation Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add investigation notes or comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <Button size="sm" className="mt-2">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}