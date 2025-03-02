import React, { useState, useEffect } from 'react';

export const BeraChainTyping = () => {
  const [text, setText] = useState('💀');
  const fullText = '💀 Base Mainnet';
  const [phase, setPhase] = useState<'typing' | 'backspacing' | 'done'>('typing');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const animateText = () => {
      if (phase === 'typing') {
        if (text.length < fullText.length) {
          setText(fullText.slice(0, text.length + 1));
        } else {
          setTimeout(() => setPhase('backspacing'), 1000); // Wait a bit before backspacing
        }
      } else if (phase === 'backspacing') {
        if (text.length > 2) { // Keep the skull emoji (length is 2 for the emoji)
          setText(text.slice(0, -1));
        } else {
          setTimeout(() => setPhase('typing'), 500); // Reset to typing after a short pause
        }
      }
    };
    
    timeout = setTimeout(animateText, phase === 'typing' ? 150 : 100);
    
    return () => clearTimeout(timeout);
  }, [text, phase]);

  return (
    <div className="font-pixelify text-[#0052FF] text-xl">
      {text}
    </div>
  );
};