import React, { useState, useEffect } from 'react';
import './PwaInstallButton.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWA_DISMISSED_KEY = 'capi-pwa-install-dismissed';

const PwaInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    const dismissedAt = sessionStorage.getItem(PWA_DISMISSED_KEY);
    const dismissedRecently = dismissedAt && Date.now() - Number(dismissedAt) < 24 * 60 * 60 * 1000;

    if (isStandalone || dismissedRecently) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowButton(true);
    };

    const handleAppInstalled = () => {
      setShowButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'dismissed') {
        sessionStorage.setItem(PWA_DISMISSED_KEY, String(Date.now()));
      }
      setShowButton(false);
      setDeferredPrompt(null);
    } finally {
      setInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowButton(false);
    sessionStorage.setItem(PWA_DISMISSED_KEY, String(Date.now()));
  };

  if (!showButton) return null;

  return (
    <div className="pwa-install-banner">
      <span className="pwa-install-text">Install cAPI Client for quick access</span>
      <div className="pwa-install-actions">
        <button
          type="button"
          className="pwa-install-button"
          onClick={handleInstallClick}
          disabled={installing}
        >
          {installing ? 'Installing…' : 'Install app'}
        </button>
        <button type="button" className="pwa-install-dismiss" onClick={handleDismiss} aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  );
};

export default PwaInstallButton;
