import React from 'react';
import { Shield, Building2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SignInProps {
  onSignIn: () => void;
}

export function SignIn({ onSignIn }: SignInProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">safeshare.ai</span>
            </div>
          </div>
          <p className="text-gray-600">AI-powered communications safety & compliance</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your organization's safeshare.ai account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={onSignIn}
              className="w-full"
              size="lg"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Sign in with SSO
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="text-center text-xs text-gray-500">
              Secure enterprise authentication via SAML/OIDC
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="text-sm text-gray-500 mb-4">
            Trusted by compliance teams worldwide
          </div>
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <span>🛡️ SOC 2 Compliant</span>
            <span>🇮🇳 India DPDP Ready</span>
            <span>🏦 BFSI Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}