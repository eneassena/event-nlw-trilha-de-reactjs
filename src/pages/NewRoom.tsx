import { Link } from 'react-router-dom'

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg'; 

import '../styles/auth.scss';

import { Button } from '../components/Button';
// import { useAuth } from '../Hooks/useAuth';
 


export function NewRoom () {
  // const { user } = useAuth();

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
          <h2>Cria uma nova sala</h2>  
          <form action="">
            <input 
              type="text" 
              placeholder="Nome da sala"
            />
            <Button type="submit" className="button">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente ? 
            <Link to="/">
              clique aqui
            </Link> 
          </p>
        </div>
      </main>
    </div>
  );
}