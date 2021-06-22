import { useHistory } from 'react-router-dom';

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../Hooks/useAuth';



export function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();

  async function handleCreateRoom(){
    history.push('/rooms/new');
    if(!user) {
      await singInWithGoogle()
    }
  }


  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustração simbolizando perguntas e resposta" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main> 
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button 
            onClick={handleCreateRoom}
            className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator" >
            entre em uma sala
          </div>
          <form action="">
            <input 
              type="text" 
              placeholder="digite o código da sala"
            />
            <Button type="submit" className="button">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}