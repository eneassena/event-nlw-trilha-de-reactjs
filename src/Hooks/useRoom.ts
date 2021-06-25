// serviços
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

/**
 * Modelo dos dados que são retornados do banco de dados(firebase)
 */
type firebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>;

/**
 * Tipagem de estado das questions
 */
type QuestionProps ={
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

// Hook useRoom
export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [question, setQuestion] = useState<QuestionProps[]>([]);
  const [title, setTitle] = useState('');

  // recupera as pergunta no banco de dados
  useEffect(() => { 
    const roomRef = database.ref(`rooms/${roomId}`);
    
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: firebaseQuestions = databaseRoom.question ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
        }
      });
      setTitle(databaseRoom.title);
      setQuestion(parsedQuestions);
    });
    return () => {
      roomRef.off('value');
    }
  }, [roomId, user?.id]);

  return { question, title }

} // end useRoom