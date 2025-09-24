import React, { useState } from 'react';
import { Check, ChevronRight, Settings, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: 'Connect Communication Tools',
    description: 'Link your Slack workspace and Gmail domain',
    icon: Settings,
  },
  {
    id: 2,
    title: 'Choose Policy Pack',
    description: 'Select compliance templates for your industry',
    icon: Shield,
  },
  {
    id: 3,
    title: 'Verify & Test',
    description: 'Send a test message to confirm everything works',
    icon: Zap,
  },
];

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to safeshare.ai</h1>
          <p className="text-gray-600">Let's get your organization set up in 3 simple steps</p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {completedSteps.includes(currentStep) ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {React.createElement(steps[currentStep - 1]?.icon, {
                      className: "h-5 w-5 text-blue-600"
                    })}
                  </div>
                )}
              </div>
              <div>
                <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
                <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Connect your communication tools</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">S</span>
                      </div>
                      <div>
                        <div className="font-medium">Slack Workspace</div>
                        <div className="text-sm text-gray-500">Monitor channels and DMs</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">G</span>
                      </div>
                      <div>
                        <div className="font-medium">Gmail Domain</div>
                        <div className="text-sm text-gray-500">Scan outgoing emails</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Choose your policy pack</h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <input type="radio" name="policy" defaultChecked className="text-blue-600" />
                      <div className="font-medium">India DPDP + BFSI Starter</div>
                      <Badge>Recommended</Badge>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      Covers PAN, Aadhaar, banking details, and Digital Personal Data Protection compliance
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <input type="radio" name="policy" className="text-blue-600" />
                      <div className="font-medium">Global GDPR Pack</div>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      European data protection regulations and privacy controls
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <input type="radio" name="policy" className="text-blue-600" />
                      <div className="font-medium">Custom Configuration</div>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">
                      Build your own policies from scratch
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Test your setup</h3>
                <p className="text-gray-600">
                  Send a test message containing sample sensitive data to verify detection is working correctly.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">Test Message Preview</div>
                  <div className="text-sm text-gray-700 bg-white p-3 rounded border">
                    "Hi team, please review the customer data: PAN ABCDE1234F, 
                    email customer@example.com, phone +91-9876543210"
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  <span>Test message would trigger 3 policy violations (PAN, Email, Phone)</span>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" disabled={currentStep === 1}>
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length ? 'Complete Setup' : 'Next Step'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}