interface SplashProps {
  isActive: boolean;
  onEnter: () => void;
}

export default function Splash({ isActive, onEnter }: SplashProps) {
  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="splash">
      <div className="splash">
        <div className="splash-logo">🎵</div>
        <p className="splash-logo-name">LA Music · Indica</p>
        <h2>Indique amigos e <em>ganhe prêmios</em></h2>
        <p>Cada amigo que você indica e se matricula na LA Music vale pontos, recompensas e reconhecimento.</p>
        <div className="splash-actions">
          <button className="btn btn-gold" onClick={onEnter}>Entrar com minha conta</button>
          <button className="btn btn-outline">Sou novo aqui</button>
        </div>
      </div>
    </div>
  );
}
