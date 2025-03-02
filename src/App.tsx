import React, { useState, useEffect } from 'react';
import { isWhitelisted } from './data/checker';
import { XLogo } from './components/XLogo';
import { DiscordLogo } from './components/DiscordLogo';
import { BeraChainTyping } from './components/BeraChainTyping';

function App() {
  const [address, setAddress] = useState('');
  const [checkResult, setCheckResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleSkulls, setVisibleSkulls] = useState(0);

  useEffect(() => {
    let mounted = true;
    let currentStep = 0;
    const totalSteps = 20; // 10 seconds with 500ms intervals
    
    const animate = () => {
      if (!mounted) return;
      
      if (currentStep < totalSteps) {
        currentStep++;
        setVisibleSkulls(prev => (prev + 1) % 4);
        setTimeout(animate, 500);
      } else {
        setLoading(false);
      }
    };

    // Start animation
    animate();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCheck = () => {
    if (!address) return;
    setCheckResult(isWhitelisted(address));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-[#0052FF] flex flex-col items-center justify-center p-4">
        <div className="mb-6">
          <img 
            src="https://i.ibb.co/W4dt7Rx3/pixil-frame-0-10.png" 
            alt="San's Skeleton Logo" 
            className="w-24 h-24 md:w-32 md:h-32 animate-pulse"
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0052FF] animate-pulse text-center">
          San's Skeleton
        </h1>
        <div className="mt-6 flex space-x-4">
          {Array.from({ length: visibleSkulls }, (_, i) => (
            <span key={i} className="text-2xl md:text-4xl">💀</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-black text-[#0052FF] p-4 relative flex flex-col"
      style={{
        backgroundImage: 'url(https://i.ibb.co/60bV5pzp/sans-skeleton-bg-v2-removebg-preview.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      {/* Header with logo on left and Bera Chain on right */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co/W4dt7Rx3/pixil-frame-0-10.png" 
            alt="San's Skeleton Logo" 
            className="w-12 h-12"
            onError={(e) => {
              e.currentTarget.onerror = null;
              console.error('Error loading logo image');
            }}
          />
          <h1 className="text-2xl font-bold text-[#0052FF]">San's Skeleton</h1>
        </div>
        <BeraChainTyping />
      </div>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-6 relative z-10">
          <div className="text-center mb-6">
            <p className="text-lg md:text-xl text-[#0052FF]">Whitelist Checker</p>
          </div>

          <div className="bg-[#0052FF]/20 p-6 md:p-8 rounded-lg border border-[#0052FF]/50 space-y-5 backdrop-blur-sm">
            <div className="space-y-2">
              <label htmlFor="address" className="block text-[#0052FF] text-sm font-medium">
                Enter your EVM wallet address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-black/50 border border-[#0052FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052FF] text-[#0052FF] placeholder-[#0052FF]/70"
              />
            </div>

            <button
              onClick={handleCheck}
              className="w-full bg-[#0052FF] hover:bg-[#0052FF]/80 text-black font-bold py-3 px-6 rounded-md transition duration-200"
            >
              Check Eligibility
            </button>

            {checkResult !== null && (
              <div className={`mt-4 p-4 rounded-md backdrop-blur-sm ${
                checkResult 
                  ? 'bg-green-900/20 border border-green-800/50 text-green-400' 
                  : 'bg-red-900/20 border border-red-800/50 text-red-400'
              }`}>
                <p className="text-center text-base md:text-lg font-medium">
                  {checkResult 
                    ? '🎉 Congratulations! Your address is whitelisted!' 
                    : '❌ Sorry, your address is not whitelisted.'}
                </p>
              </div>
            )}
          </div>

          <p className="text-center text-[#0052FF]/70 text-xs md:text-sm">
            Verify your eligibility for San's Skeleton collection
          </p>
        </div>
      </div>

      {/* Social Links Footer */}
      <div className="relative z-10 flex justify-center gap-6 mt-8 mb-4">
        <a
          href="https://x.com/sansskeleton__"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0052FF] hover:text-[#0052FF]/80 transition-colors"
        >
          <XLogo size={24} />
        </a>
        <button
          disabled
          className="text-[#0052FF] opacity-50 cursor-not-allowed"
          title="Discord link coming soon"
        >
          <DiscordLogo size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;