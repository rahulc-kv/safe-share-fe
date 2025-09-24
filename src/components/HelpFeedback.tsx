import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Video,
  ExternalLink,
  Send,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  ChevronRight,
  FileText,
  Zap,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const faqData = [
  {
    id: 'getting-started',
    category: 'Getting Started',
    icon: <Zap className="w-4 h-4" />,
    questions: [
      {
        q: 'How do I set up safeshare.ai for my organization?',
        a: 'Start with our onboarding wizard to connect your communication tools, choose policy packs, and test the setup. The process typically takes 10-15 minutes.'
      },
      {
        q: 'Which communication platforms are supported?',
        a: 'Currently we support Slack Enterprise, Gmail (domain-wide), Microsoft Teams, and Outlook/Exchange. More platforms are added regularly.'
      },
      {
        q: 'How long does it take to deploy across my organization?',
        a: 'Most organizations are fully deployed within 1 day. Our target time-to-deploy is under 24 hours for standard configurations.'
      }
    ]
  },
  {
    id: 'policies',
    category: 'Policies & Compliance',
    icon: <Shield className="w-4 h-4" />,
    questions: [
      {
        q: 'What types of sensitive data can safeshare.ai detect?',
        a: 'We detect PAN numbers, Aadhaar numbers, credit cards, phone numbers, emails, API keys, and more. Our ML models are continuously updated with new patterns.'
      },
      {
        q: 'Can I customize policies for different departments?',
        a: 'Yes, policies can be scoped to specific departments, teams, or individual users. You can also set different enforcement levels per group.'
      },
      {
        q: 'How do I ensure compliance with Indian DPDP Act?',
        a: 'Our India DPDP policy pack provides pre-configured rules for Indian data protection compliance. It includes PAN, Aadhaar, and other PII detection patterns.'
      }
    ]
  },
  {
    id: 'incidents',
    category: 'Incidents & Reports',
    icon: <FileText className="w-4 h-4" />,
    questions: [
      {
        q: 'What happens when a policy violation is detected?',
        a: 'Depending on your policy settings, users may see a nudge, soft block (requiring acknowledgment), or hard block (preventing send). All incidents are logged for audit.'
      },
      {
        q: 'How do I generate compliance reports?',
        a: 'Use our Reports section to generate executive summaries, detailed incident reports, and compliance exports. Reports can be scheduled or generated on-demand.'
      },
      {
        q: 'Can I export incident data for external analysis?',
        a: 'Yes, incident data can be exported in CSV, JSON, or PDF formats. All exports maintain data privacy and include only necessary information for compliance review.'
      }
    ]
  }
];

const resources = [
  {
    title: 'Quick Start Guide',
    description: 'Get up and running with safeshare.ai in 15 minutes',
    type: 'guide',
    url: '#',
    duration: '15 min read'
  },
  {
    title: 'Policy Configuration Best Practices',
    description: 'Learn how to configure effective data protection policies',
    type: 'guide',
    url: '#',
    duration: '10 min read'
  },
  {
    title: 'API Documentation',
    description: 'Complete reference for safeshare.ai APIs',
    type: 'docs',
    url: '#',
    duration: 'Reference'
  },
  {
    title: 'Compliance Framework Guide',
    description: 'Navigate GDPR, DPDP, and other regulations',
    type: 'guide',
    url: '#',
    duration: '20 min read'
  },
  {
    title: 'Video: Setting up Slack Integration',
    description: 'Step-by-step video guide for Slack setup',
    type: 'video',
    url: '#',
    duration: '8 min watch'
  },
  {
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently encountered problems',
    type: 'guide',
    url: '#',
    duration: '12 min read'
  }
];

export function HelpFeedback() {
  const [feedbackType, setFeedbackType] = useState('feature-request');
  const [feedbackText, setFeedbackText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaq = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'docs': return <FileText className="w-4 h-4" />;
      default: return <Book className="w-4 h-4" />;
    }
  };

  const submitFeedback = () => {
    // Handle feedback submission
    setFeedbackText('');
    // Show success message
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600">Get help, find resources, and share feedback</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button>
            <Book className="w-4 h-4 mr-2" />
            Documentation
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-green-600">{"< 2h"}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Help Articles</p>
                <p className="text-2xl font-bold text-blue-600">{resources.length}</p>
              </div>
              <Book className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Video Tutorials</p>
                <p className="text-2xl font-bold text-purple-600">
                  {resources.filter(r => r.type === 'video').length}
                </p>
              </div>
              <Video className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-orange-600">4.9★</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredFaq.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {category.icon}
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documentation and resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{resource.duration}</span>
                    <Button variant="ghost" size="sm">
                      <span>Read more</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>Help us improve safeshare.ai with your suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Feedback Type</label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature-request">Feature Request</SelectItem>
                      <SelectItem value="bug-report">Bug Report</SelectItem>
                      <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                      <SelectItem value="general">General Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Feedback</label>
                  <Textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows={6}
                  />
                </div>

                <Button onClick={submitFeedback} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common support actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support Team
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Book className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Watch Tutorial Videos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rate Your Experience</CardTitle>
                  <CardDescription>How satisfied are you with safeshare.ai?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button key={star} variant="ghost" size="sm" className="p-1">
                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      </Button>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Helpful
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Not Helpful
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Team</CardTitle>
                <CardDescription>Get direct help from our experts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-500">Available 24/7 for urgent issues</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-gray-500">support@safeshare.ai</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Video Call</div>
                    <div className="text-sm text-gray-500">Schedule a consultation</div>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current service availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { service: 'API Services', status: 'operational' },
                  { service: 'Slack Integration', status: 'operational' },
                  { service: 'Gmail Integration', status: 'operational' },
                  { service: 'Dashboard', status: 'operational' },
                  { service: 'Data Processing', status: 'operational' }
                ].map((item) => (
                  <div key={item.service} className="flex items-center justify-between">
                    <span className="text-sm">{item.service}</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {item.status}
                    </Badge>
                  </div>
                ))}
                
                <div className="pt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Status Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}