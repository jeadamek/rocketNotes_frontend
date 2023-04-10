import { BrowserRouter } from "react-router-dom";
import { useAuth } from '../hooks/auth';

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  // acessar user de dentro de useAuth()
  const { user } = useAuth();
  
  return(
    <BrowserRouter>
    {/* // user eh usado para fazer uma condicao entre {} pois usaremos o conteudo de uma variavel */}
    { user ? <AppRoutes/> : <AuthRoutes /> }
    </BrowserRouter>
  )
}