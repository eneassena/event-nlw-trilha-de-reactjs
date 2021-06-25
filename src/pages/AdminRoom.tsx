import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question/index';
import { RoomCode } from '../components/RoomCode'
// import { useAuth } from '../Hooks/useAuth';
import { useRoom } from '../Hooks/useRoom';
import { database } from '../services/firebase';

// stylesheet da page pages/Room.tsx
import '../styles/rooms.scss';

type RoomParams = {
  id: string;
}
 

export function AdminRoom() {

  // const {user} = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { question, title } = useRoom(roomId);
 

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });
    history.push('/');
  }
  
  // function Remove a Pergunta
  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que você deseja excluir esa pergunta?')) {
      await database.ref(`rooms/${roomId}/question/${questionId}`).remove();
    }
  }
  // function Marca Pergunta como respondida
  async function handleCheckQuestionAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/question/${questionId}`).update({
      isAnswered: true,
    });
  }
  
  // function Dar destaque á Pergunta
  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/question/${questionId}`).update({
      isHighlighted: true
    });
  }  

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutLined onClick={() => handleEndRoom}>
              Encerrar Sala 
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { question.length > 0 && <span>{question.length} pergunta(s)</span>}
        </div>
          
        <div className="question-list">
          {question.map(question => {
            return (
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >   
                {!question.isAnswered && (
                  <>
                    <button 
                      type="button"
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marca Pergunta como respondida" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleHighLightQuestion(question.id)}
                      >
                      <img src={answerImg} alt="Dar destaque á Pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}