import React, { useState } from 'react';
import { 
  Save, 
  Globe, 
  Shield, 
  Database,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon,
  Key,
  Mail,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Textarea } from './ui/textarea';

export function Settings() {
  const [settings, setSettings] = useState({
    organization: {
      name: 'Acme Corporation',
      domain: 'acme.com',
      industry: 'financial-services',
      region: 'india',
      timezone: 'Asia/Kolkata'
    },
    compliance: {
      dataResidency: 'india',
      retentionPeriod: 365,
      evidenceRetention: 180,
      auditLogRetention: 30,
      encryptionLevel: 'aes-256',
      complianceMode: 'strict'
    },
    notifications: {
      emailAlerts: true,
      slackIntegration: false,
      webhookUrl: '',
      criticalThreshold: 'high-severity',
      reportFrequency: 'weekly'
    },
    security: {
      sessionTimeout: 8,
      mfaRequired: true,
      apiKeyRotation: 90,
      failedLoginLimit: 5,
      passwordPolicy: 'strict'
    }
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system preferences and compliance settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            Reset to Defaults
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Organization Details</span>
              </CardTitle>
              <CardDescription>Basic information about your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={settings.organization.name}
                    onChange={(e) => updateSetting('organization', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Primary Domain</Label>
                  <Input
                    id="domain"
                    value={settings.organization.domain}
                    onChange={(e) => updateSetting('organization', 'domain', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select 
                    value={settings.organization.industry} 
                    onValueChange={(value) => updateSetting('organization', 'industry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial-services">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="region">Primary Region</Label>
                  <Select 
                    value={settings.organization.region} 
                    onValueChange={(value) => updateSetting('organization', 'region', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="united-states">United States</SelectItem>
                      <SelectItem value="european-union">European Union</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={settings.organization.timezone} 
                  onValueChange={(value) => updateSetting('organization', 'timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                    <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                    <SelectItem value="Asia/Singapore">Asia/Singapore (SGT)</SelectItem>
                    <SelectItem value="Australia/Sydney">Australia/Sydney (AEST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Changes to compliance settings may affect data handling and regulatory adherence. 
              Consult your legal team before modifying these configurations.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Data Residency & Retention</span>
              </CardTitle>
              <CardDescription>Configure where data is stored and for how long</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="data-residency">Data Residency Region</Label>
                <Select 
                  value={settings.compliance.dataResidency} 
                  onValueChange={(value) => updateSetting('compliance', 'dataResidency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India (Mumbai)</SelectItem>
                    <SelectItem value="us-east">US East (Virginia)</SelectItem>
                    <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                    <SelectItem value="asia-pacific">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Current region complies with local data protection laws
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="retention-period">Incident Retention (days)</Label>
                  <Input
                    id="retention-period"
                    type="number"
                    value={settings.compliance.retentionPeriod}
                    onChange={(e) => updateSetting('compliance', 'retentionPeriod', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="evidence-retention">Evidence Retention (days)</Label>
                  <Input
                    id="evidence-retention"
                    type="number"
                    value={settings.compliance.evidenceRetention}
                    onChange={(e) => updateSetting('compliance', 'evidenceRetention', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="audit-retention">Audit Log Retention (days)</Label>
                  <Input
                    id="audit-retention"
                    type="number"
                    value={settings.compliance.auditLogRetention}
                    onChange={(e) => updateSetting('compliance', 'auditLogRetention', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="encryption">Encryption Level</Label>
                  <Select 
                    value={settings.compliance.encryptionLevel} 
                    onValueChange={(value) => updateSetting('compliance', 'encryptionLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aes-128">AES-128</SelectItem>
                      <SelectItem value="aes-256">AES-256 (Recommended)</SelectItem>
                      <SelectItem value="aes-256-gcm">AES-256-GCM (Enhanced)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="compliance-mode">Compliance Mode</Label>
                  <Select 
                    value={settings.compliance.complianceMode} 
                    onValueChange={(value) => updateSetting('compliance', 'complianceMode', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permissive">Permissive</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="strict">Strict (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Standards</CardTitle>
              <CardDescription>Active compliance frameworks and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: 'DPDP Act 2023', active: true },
                  { name: 'GDPR', active: false },
                  { name: 'SOC 2 Type II', active: true },
                  { name: 'ISO 27001', active: true },
                  { name: 'HIPAA', active: false },
                  { name: 'BFSI Guidelines', active: true },
                  { name: 'CCPA', active: false },
                  { name: 'PCI DSS', active: false }
                ].map((standard) => (
                  <div key={standard.name} className="flex items-center space-x-2">
                    <Switch
                      checked={standard.active}
                      onCheckedChange={(checked) => {
                        // Handle compliance standard toggle
                      }}
                    />
                    <span className="text-sm">{standard.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Authentication & Access</span>
              </CardTitle>
              <CardDescription>Configure user authentication and session management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                  <Select 
                    value={settings.security.sessionTimeout.toString()} 
                    onValueChange={(value) => updateSetting('security', 'sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours (Recommended)</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="failed-login-limit">Failed Login Limit</Label>
                  <Input
                    id="failed-login-limit"
                    type="number"
                    value={settings.security.failedLoginLimit}
                    onChange={(e) => updateSetting('security', 'failedLoginLimit', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Multi-Factor Authentication</label>
                    <p className="text-sm text-gray-500">Require MFA for all admin users</p>
                  </div>
                  <Switch
                    checked={settings.security.mfaRequired}
                    onCheckedChange={(checked) => updateSetting('security', 'mfaRequired', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Strong Password Policy</label>
                    <p className="text-sm text-gray-500">Enforce complex password requirements</p>
                  </div>
                  <Switch
                    checked={settings.security.passwordPolicy === 'strict'}
                    onCheckedChange={(checked) => updateSetting('security', 'passwordPolicy', checked ? 'strict' : 'basic')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Configure API access and key management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key-rotation">API Key Rotation (days)</Label>
                <Select 
                  value={settings.security.apiKeyRotation.toString()} 
                  onValueChange={(value) => updateSetting('security', 'apiKeyRotation', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days (Recommended)</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">365 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  All API communications use TLS 1.3 encryption with certificate pinning enabled.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Alert Configuration</span>
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Email Alerts</label>
                    <p className="text-sm text-gray-500">Receive email notifications for incidents</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emailAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Slack Integration</label>
                    <p className="text-sm text-gray-500">Send alerts to Slack channels</p>
                  </div>
                  <Switch
                    checked={settings.notifications.slackIntegration}
                    onCheckedChange={(checked) => updateSetting('notifications', 'slackIntegration', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="critical-threshold">Alert Threshold</Label>
                  <Select 
                    value={settings.notifications.criticalThreshold} 
                    onValueChange={(value) => updateSetting('notifications', 'criticalThreshold', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-incidents">All Incidents</SelectItem>
                      <SelectItem value="medium-severity">Medium+ Severity</SelectItem>
                      <SelectItem value="high-severity">High Severity Only</SelectItem>
                      <SelectItem value="critical-only">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="report-frequency">Report Frequency</Label>
                  <Select 
                    value={settings.notifications.reportFrequency} 
                    onValueChange={(value) => updateSetting('notifications', 'reportFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="webhook-url">Webhook URL (Optional)</Label>
                <Input
                  id="webhook-url"
                  value={settings.notifications.webhookUrl}
                  onChange={(e) => updateSetting('notifications', 'webhookUrl', e.target.value)}
                  placeholder="https://your-webhook-endpoint.com/safeshare"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Receive real-time incident notifications via webhook
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize notification email content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email-subject">Subject Line Template</Label>
                <Input
                  id="email-subject"
                  defaultValue="[SafeShare Alert] {severity} violation detected in {channel}"
                  placeholder="Customize email subject template"
                />
              </div>
              
              <div>
                <Label htmlFor="email-body">Email Body Template</Label>
                <Textarea
                  id="email-body"
                  rows={4}
                  defaultValue="A {severity} policy violation has been detected in {channel} by {user}. Please review the incident details in your SafeShare dashboard."
                  placeholder="Customize email body template"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}