import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all required fields.'); return; }
    if (mode === 'register') {
      if (!username) { setError('Please enter a username.'); return; }
      if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); onAuthenticated(); }, 1200);
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
    setEmail('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px',
    paddingLeft: '52px', paddingRight: '16px', paddingTop: '17px', paddingBottom: '17px',
    fontSize: '15px', color: 'white', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.55)';
    e.currentTarget.style.boxShadow = '0 0 22px rgba(34,211,238,0.13)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f172a 0%, rgba(23,37,84,0.7) 50%, rgba(8,47,73,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
        <div style={{ position: 'absolute', width: 800, height: 800, top: '-20%', left: '-10%', borderRadius: '50%', background: 'rgba(6,182,212,0.07)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 700, height: 700, bottom: '-20%', right: '-10%', borderRadius: '50%', background: 'rgba(29,78,216,0.09)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', filter: 'blur(80px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '680px', margin: '0 32px' }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sparkles style={{ width: 20, height: 20, color: 'rgb(34,211,238)' }} />
            <span style={{ color: 'rgba(34,211,238,0.6)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase' }}>Spatial Insight</span>
            <Sparkles style={{ width: 20, height: 20, color: 'rgb(34,211,238)' }} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ fontSize: '56px', lineHeight: 1.1, fontWeight: 700, color: 'white', margin: 0, textShadow: '0 0 40px rgba(34,211,238,0.5), 0 0 80px rgba(34,211,238,0.2)' }}>
            Insight{' '}
            <span style={{ background: 'linear-gradient(to right, rgb(103,232,249), rgb(96,165,250))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Engine</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            style={{ marginTop: '10px', fontSize: '16px', color: 'rgba(255,255,255,0.4)' }}>
            {mode === 'login' ? 'Welcome back — sign in to continue.' : 'Create your account to begin.'}
          </motion.p>
        </div>

        {/* Glass card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 0 100px rgba(34,211,238,0.09), 0 32px 80px rgba(0,0,0,0.6)' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {(['login', 'register'] as const).map((tab) => (
              <button key={tab} onClick={() => switchMode(tab)}
                style={{ flex: 1, padding: '22px 0', fontSize: '15px', fontWeight: 500, position: 'relative', transition: 'color 0.2s', color: mode === tab ? 'rgb(103,232,249)' : 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {tab === 'login' ? 'Sign In' : 'Create Account'}
                {mode === tab && (
                  <motion.div layoutId="activeTab"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgb(34,211,238), transparent)' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'login' ? 16 : -16 }}
              transition={{ duration: 0.22 }}
              onSubmit={handleSubmit}
              style={{ padding: '44px 52px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {mode === 'register' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Username</label>
                  <div style={{ position: 'relative' }}>
                    <User style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(255,255,255,0.25)' }} />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your display name" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(255,255,255,0.25)' }} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(255,255,255,0.25)' }} />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle, paddingRight: '52px' }} onFocus={onFocus} onBlur={onBlur} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
                    {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(255,255,255,0.25)' }} />
                    <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={{ ...inputStyle, paddingRight: '52px' }} onFocus={onFocus} onBlur={onBlur} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 0, display: 'flex' }}>
                      {showConfirmPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                    </button>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    style={{ fontSize: '13px', color: 'rgba(248,113,113,0.9)', background: 'rgba(127,29,29,0.3)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '12px 16px', margin: 0 }}>
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button type="submit" disabled={isLoading}
                whileHover={!isLoading ? { boxShadow: '0 0 36px rgba(34,211,238,0.45)' } : {}}
                style={{ width: '100%', padding: '18px', borderRadius: '14px', fontWeight: 600, fontSize: '16px', color: 'white', background: 'linear-gradient(to right, rgba(8,145,178,0.85), rgba(37,99,235,0.85))', border: '1px solid rgba(34,211,238,0.4)', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1, marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                {isLoading ? (
                  <>
                    <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                    <span>{mode === 'login' ? 'Signing in…' : 'Creating account…'}</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Enter the Engine' : 'Create Account'}</span>
                    <ArrowRight style={{ width: 20, height: 20 }} />
                  </>
                )}
              </motion.button>

              {mode === 'login' && (
                <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', margin: 0 }}>
                  Forgot your password?
                </p>
              )}
            </motion.form>
          </AnimatePresence>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '24px' }}>
          © 2026 Spatial Insight · All rights reserved
        </motion.p>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
