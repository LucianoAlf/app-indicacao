import { Theme } from '../types';
import TopBar from '../components/TopBar';

interface IndicateProps {
  isActive: boolean;
  toggleTheme: () => void;
  showToast: (msg: string) => void;
  theme: Theme;
}

export default function Indicate({ isActive, toggleTheme, showToast, theme }: IndicateProps) {
  const copyLink = () => {
    navigator.clipboard?.writeText('https://lamusica.com/indica/rafael2024').catch(() => {});
    showToast('🔗 Link copiado!');
  };

  const shareWhats = () => {
    const msg = encodeURIComponent('Oi! 🎵 Estou estudando música na *LA Music* e está sendo incrível! Vem fazer uma *aula experimental grátis*! Clica aqui: https://lamusica.com/indica/rafael2024');
    const url = 'https://wa.me/?text=' + msg;
    try { window.open(url, '_blank'); } catch(e) {}
    showToast('📲 Abrindo WhatsApp...');
  };

  return (
    <div className={`screen ${isActive ? 'active' : ''}`} id="indicate">
      <TopBar
        title="Indicar Amigo"
        subtitle="Compartilhe e ganhe"
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="indicate-content">

        <div className="indicate-hero">
          <div className="points-badge">+100 pts por matrícula 🏅</div>
          <h2>Seu link <em>único</em></h2>
          <p>Cada amigo que entrar pela sua indicação e se matricular vale pontos, recompensas e sobe no ranking.</p>
        </div>

        {/* Link box */}
        <div className="share-link-box">
          <div className="share-link-text">
            <p>Seu link de indicação</p>
            <code>lamusica.com/indica/rafael2024</code>
          </div>
          <button className="copy-btn" onClick={copyLink}>Copiar</button>
        </div>

        {/* WhatsApp button big */}
        <button className="btn btn-whats" style={{ marginBottom: '16px', fontSize: '1rem' }} onClick={shareWhats}>
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Compartilhar no WhatsApp
        </button>

        {/* Outras opções */}
        <div className="share-options">
          <div className="share-opt whats" onClick={shareWhats}>
            <div className="share-opt-icon green">💬</div>
            Mensagem WhatsApp
          </div>
          <div className="share-opt" onClick={copyLink}>
            <div className="share-opt-icon copy">🔗</div>
            Copiar Link
          </div>
          <div className="share-opt">
            <div className="share-opt-icon blue">📸</div>
            Stories / Instagram
          </div>
          <div className="share-opt">
            <div className="share-opt-icon more">⬆️</div>
            Mais opções
          </div>
        </div>

        {/* Mensagem pronta */}
        <div className="msg-preview">
          <h3>Mensagem pronta para enviar</h3>
          <div className="msg-bubble">
            Oi! 🎵 Estou estudando música na <strong>LA Music</strong> e está sendo incrível! Você podia vir fazer uma <strong>aula experimental grátis</strong>! Clica aqui para agendar: lamusica.com/indica/rafael2024 — uso esse link que é da minha indicação 😄
          </div>
        </div>

        {/* Como funciona */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', marginBottom: '16px' }}>Como funciona?</h3>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-num">1</div>
              <div className="how-step-text">
                <h4>Você compartilha o link</h4>
                <p>Manda no WhatsApp, Instagram ou de onde preferir.</p>
              </div>
            </div>
            <div className="how-step">
              <div className="how-num">2</div>
              <div className="how-step-text">
                <h4>Amigo agenda a aula experimental</h4>
                <p>Gratuita e sem compromisso. A escola cuida do resto.</p>
              </div>
            </div>
            <div className="how-step">
              <div className="how-num">3</div>
              <div className="how-step-text">
                <h4>Se ele se matricular, você ganha</h4>
                <p>+100 pontos direto na sua conta. Você acompanha tudo aqui.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
