import { useState } from 'react';
import { useAuth } from '../lib/auth';

interface SplashProps {
  isActive: boolean;
}

export default function Splash({ isActive }: SplashProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'welcome' | 'login' | 'signup'>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    } else if (mode === 'signup') {
      const { error } = await signUp(email, password, fullName, '365702c5-0f99-418b-a542-68c766b6a45a');
      if (error) setError(error);
    }
    setLoading(false);
  };

  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="splash">
      <div className="splash">
        <div className="splash-logo">🎵</div>
        <p className="splash-logo-name">LA Music · Indica</p>

        {mode === 'welcome' && (
          <>
            <h2>Indique amigos e <em>ganhe prêmios</em></h2>
            <p>Cada amigo que você indica e se matricula na LA Music vale pontos, recompensas e reconhecimento.</p>
            <div className="splash-actions">
              <button className="btn btn-gold" onClick={() => setMode('login')}>Entrar com minha conta</button>
              <button className="btn btn-outline" onClick={() => setMode('signup')}>Sou novo aqui</button>
            </div>
          </>
        )}

        {mode === 'login' && (
          <>
            <h2>Entrar na sua conta</h2>
            <div className="splash-form">
              <input type="email" placeholder="Seu e-mail" value={email} onChange={e => setEmail(e.target.value)} className="form-input" />
              <input type="password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} className="form-input" />
              {error && <p className="form-error">{error}</p>}
              <button className="btn btn-gold" onClick={handleSubmit} disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
              <button className="btn btn-outline" onClick={() => { setMode('welcome'); setError(null); }}>Voltar</button>
            </div>
          </>
        )}

        {mode === 'signup' && (
          <>
            <h2>Criar sua conta</h2>
            <div className="splash-form">
              <input type="text" placeholder="Seu nome completo" value={fullName} onChange={e => setFullName(e.target.value)} className="form-input" />
              <input type="email" placeholder="Seu e-mail" value={email} onChange={e => setEmail(e.target.value)} className="form-input" />
              <input type="password" placeholder="Criar senha" value={password} onChange={e => setPassword(e.target.value)} className="form-input" />
              {error && <p className="form-error">{error}</p>}
              <button className="btn btn-gold" onClick={handleSubmit} disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</button>
              <button className="btn btn-outline" onClick={() => { setMode('welcome'); setError(null); }}>Voltar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
