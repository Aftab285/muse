import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { Button, Input, Card } from '../components/UIComponents';
import { generateBio } from '../services/geminiService';
import { UserRole } from '../types';

interface OnboardingProps {
  setUserRole: (role: UserRole) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [bio, setBio] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleGenerateBio = async () => {
    if (!keywords || !role) return;
    setIsGenerating(true);
    const generated = await generateBio(role, keywords);
    setBio(generated);
    setIsGenerating(false);
  };

  const handleComplete = () => {
    if (role) {
      setUserRole(role);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-8 left-8">
        <button onClick={() => navigate('/')} className="flex items-center text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
      </div>

      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {step === 1 ? 'Choose your path' : 'Create your profile'}
            </h1>
            <p className="text-slate-500">
                {step === 1 ? 'Join as a creator or find creators for your brand.' : 'Let\'s get you set up efficiently.'}
            </p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => handleRoleSelect('brand')}
                    className="p-8 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 transition-all text-left group"
                >
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">I'm a Brand</h3>
                    <p className="text-sm text-slate-500 mt-1">Hiring creators for campaigns</p>
                </button>

                <button 
                    onClick={() => handleRoleSelect('influencer')}
                    className="p-8 bg-white border border-slate-200 rounded-xl hover:border-violet-500 hover:ring-1 hover:ring-violet-500 transition-all text-left group"
                >
                    <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">I'm a Creator</h3>
                    <p className="text-sm text-slate-500 mt-1">Looking for brand partnerships</p>
                </button>
            </div>
        )}

        {/* Step 2: Details & AI Bio */}
        {step === 2 && (
            <Card className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                    <Input 
                        label={role === 'brand' ? 'Brand Name' : 'Full Name'} 
                        placeholder={role === 'brand' ? 'Acme Corp' : 'Jane Doe'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            {role === 'brand' ? 'Industry / Focus' : 'Niches / Interests'}
                        </label>
                        <Input 
                            placeholder="e.g. Sustainable Fashion, Tech, Travel" 
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-medium text-slate-700">Bio</label>
                            <button 
                                onClick={handleGenerateBio}
                                disabled={!keywords || isGenerating}
                                className="text-xs flex items-center text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                            >
                                <Sparkles className="w-3 h-3 mr-1" />
                                {isGenerating ? 'Generating...' : 'Auto-write with AI'}
                            </button>
                        </div>
                        <textarea 
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                            placeholder="Tell us about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                         {bio && (
                            <div className="absolute right-2 bottom-2 text-xs text-slate-400">
                                {bio.length}/280
                            </div>
                         )}
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                        <Button className="flex-1" onClick={handleComplete} disabled={!name}>Complete Profile</Button>
                    </div>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
};