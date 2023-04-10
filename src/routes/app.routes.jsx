// Routes ira envolver todas as rotas
// Route é um componente para gerar cada rota
import { Routes, Route } from 'react-router-dom';

// impotar paginas
import { New } from '../pages/New';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { Details } from '../pages/Details';

export function AppRoutes() {
  return(
    <Routes>
      {/* path -> endereço
      element -> qual pagina sera renderizada */}
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      {/* Details tem uma particularidade, precisamos do codigo da nota para exibir ela */}
      {/* entao recebemos um paramentro /:id e depois conseguimos recuperar o paramentro pela rota */}
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  )
}