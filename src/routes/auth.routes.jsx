// Routes ira envolver todas as rotas
// Route é um componente para gerar cada rota
import { Routes, Route } from 'react-router-dom';

// impotar paginas
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AuthRoutes() {
  return(
    <Routes>
      {/* path -> endereço
      element -> qual pagina sera renderizada */}
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}