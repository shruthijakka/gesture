import React from 'react';

// 1. This Interface is the "Secret Sauce" that fixes the red line in App.tsx
interface AuthScreenProps {
  onLogin: () => void;
}

// 2. We apply the interface to the component
const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Omnisync
        </h1>
        <p className="text-slate-400 text-center mb-8">
          HCI Real-time Gesture & Safety Assistant
        </p>

        <div className="space-y-4">
          <button
            onClick={onLogin}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-semibold shadow-lg shadow-blue-900/20"
          >
            Sign In as Guest
          </button>
          
          <p className="text-xs text-center text-slate-500 mt-4">
            By signing in, you enable real-time camera processing for gesture and mood detection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;