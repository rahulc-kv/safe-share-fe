import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { SignIn } from './components/SignIn';
import { OnboardingWizard } from './components/OnboardingWizard';
import { IncidentsList } from './components/IncidentsList';
import { IncidentDetail } from './components/IncidentDetail';
import { PoliciesList } from './components/PoliciesList';
import { PolicyEditor } from './components/PolicyEditor';
import { PolicyPacks } from './components/PolicyPacks';
import { Connectors } from './components/Connectors';
import { UsersRoles } from './components/UsersRoles';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { AuditLogs } from './components/AuditLogs';
import { HelpFeedback } from './components/HelpFeedback';
import { Layout } from './components/Layout';
import { Toaster } from "./components/ui/sonner";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // if (!isAuthenticated) {
  //   return <SignIn onSignIn={() => setIsAuthenticated(true)} />;
  // }

  // if (!isOnboarded) {
  //   return <OnboardingWizard onComplete={() => setIsOnboarded(true)} />;
  // }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<IncidentsList />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
          <Route path="/policies" element={<PoliciesList />} />
          <Route path="/policies/new" element={<PolicyEditor />} />
          <Route path="/policies/:id" element={<PolicyEditor />} />
          <Route path="/policy-packs" element={<PolicyPacks />} />
          <Route path="/connectors" element={<Connectors />} />
          <Route path="/users" element={<UsersRoles />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="/help" element={<HelpFeedback />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;