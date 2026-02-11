
/*import React, { useState } from 'react';
import { InteractionMode, SystemState, UserProfile, InteractionLog } from './types';
import { MOCK_USER } from './constants';
import AuthScreen from './components/AuthScreen';
import ModeSelector from './components/ModeSelector';
import MainDashboard from './components/MainDashboard';

const App: React.FC = () => {
  const [state, setState] = useState<SystemState>({
    isAuthenticated: false,
    isCalibrating: false,
    selectedModes: [],
    currentUser: null,
    lastLog: null,
    isProcessing: false,
    isSafetyAlertActive: false,
  });

  const handleLogin = (user: UserProfile) => {
    setState(prev => ({ ...prev, isAuthenticated: true, currentUser: user }));
  };

  const handleModeToggle = (mode: InteractionMode) => {
    setState(prev => {
      const isSelected = prev.selectedModes.includes(mode);
      const newModes = isSelected
        ? prev.selectedModes.filter(m => m !== mode)
        : [...prev.selectedModes, mode];
      return { ...prev, selectedModes: newModes };
    });
  };

  const startSession = () => {
    if (state.selectedModes.length === 0) {
      alert("Please select at least one interaction mode.");
      return;
    }
    setState(prev => ({ ...prev, isCalibrating: true }));
  };

  const finishCalibration = () => {
    setState(prev => ({ ...prev, isCalibrating: false }));
  };

  const logInteraction = (log: InteractionLog) => {
    // Check if the message indicates a safety risk
    const isSafetyIssue = 
      log.systemMessage.toLowerCase().includes('safety') || 
      log.systemMessage.toLowerCase().includes('risky') ||
      log.systemMessage.toLowerCase().includes('danger');

    setState(prev => ({
      ...prev,
      lastLog: log,
      isSafetyAlertActive: isSafetyIssue
    }));
  };

  // 1. Authentication Gate
  if (!state.isAuthenticated) {
    return <AuthScreen onLogin={() => handleLogin(MOCK_USER)} />;
  }

  // 2. Setup/Calibration Gate
  // Show selector if no modes selected OR if we just started calibrating but have no AI data yet
  if (state.selectedModes.length === 0 || (state.isCalibrating && state.lastLog === null)) {
    return (
      <ModeSelector 
        selectedModes={state.selectedModes} 
        onToggle={handleModeToggle} 
        onStart={startSession}
        isCalibrating={state.isCalibrating}
        onFinishCalibration={finishCalibration}
      />
    );
  }

  // 3. Main Interface
  return (
    <MainDashboard 
      state={state} 
      onInteraction={logInteraction}
      onToggleCalibration={() => setState(prev => ({ ...prev, isCalibrating: !prev.isCalibrating }))}
      onLogout={() => window.location.reload()}
    />
  );
};

export default App;*/
import React, { useState } from 'react';
// These imports assume your files are named exactly like this in the /src folder
import { InteractionMode, SystemState, UserProfile, InteractionLog } from './types';
import { MOCK_USER } from './constants';
import AuthScreen from './components/AuthScreen';
import ModeSelector from './components/ModeSelector';
import MainDashboard from './components/MainDashboard';

const App: React.FC = () => {
  // 1. Initializing state with the SystemState type clears 'useState' errors
  const [state, setState] = useState<SystemState>({
    isAuthenticated: false,
    isCalibrating: false,
    selectedModes: [],
    currentUser: null,
    lastLog: null,
    isProcessing: false,
    isSafetyAlertActive: false,
  });

  const handleLogin = (user: UserProfile) => {
    setState((prev: SystemState) => ({ 
      ...prev, 
      isAuthenticated: true, 
      currentUser: user 
    }));
  };

  const handleModeToggle = (mode: InteractionMode) => {
    setState((prev: SystemState) => {
      const isSelected = prev.selectedModes.includes(mode);
      const newModes = isSelected
        ? prev.selectedModes.filter(m => m !== mode)
        : [...prev.selectedModes, mode];
      return { ...prev, selectedModes: newModes };
    });
  };

  const startSession = () => {
    if (state.selectedModes.length === 0) {
      alert("Please select at least one interaction mode.");
      return;
    }
    setState((prev: SystemState) => ({ ...prev, isCalibrating: true }));
  };

  const finishCalibration = () => {
    setState((prev: SystemState) => ({ ...prev, isCalibrating: false }));
  };

  const logInteraction = (log: InteractionLog) => {
    const isSafetyIssue = 
      log.systemMessage.toLowerCase().includes('safety') || 
      log.systemMessage.toLowerCase().includes('risky') ||
      log.systemMessage.toLowerCase().includes('danger');

    // 2. Explicitly typing 'prev' as SystemState clears the underline error
    setState((prev: SystemState) => ({
      ...prev,
      lastLog: log,
      isSafetyAlertActive: isSafetyIssue
    }));
  };

  if (!state.isAuthenticated) {
    return <AuthScreen onLogin={() => handleLogin(MOCK_USER)} />;
  }

  if (state.selectedModes.length === 0 || (state.isCalibrating && state.lastLog === null)) {
    return (
      <ModeSelector 
        selectedModes={state.selectedModes} 
        onToggle={handleModeToggle} 
        onStart={startSession}
        isCalibrating={state.isCalibrating}
        onFinishCalibration={finishCalibration}
      />
    );
  }

  return (
    <MainDashboard 
      state={state} 
      onInteraction={logInteraction}
      onToggleCalibration={() => 
        setState((prev: SystemState) => ({ ...prev, isCalibrating: !prev.isCalibrating }))
      }
      onLogout={() => window.location.reload()}
    />
  );
};

export default App;