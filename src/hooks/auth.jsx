import { createContext, useContext, useState, useEffect } from 'react';

import { api } from '../services/api';

const AuthContext = createContext({});

function AuthProvider({ children }){
  // criar estado com valor inicial de um objeto vazio
  const [data, setData] = useState({})

  async function signIn({ email, password }){
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      // JSON.stringify() para transformar ame texto
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

      // token já é um texto, não precisa ser convertido
      localStorage.setItem("@rocketnotes:token", token)

      // estamos inserindo um token do tipo bearer
      // de autorizacao do cabecalho por padrao
      // de todas as requisicoes que forem ser feitas
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // armazenamos no estado data user e token
      setData({ user, token });

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");  

    setData({});
  }

  async function updateProfile({ user, avatarFile }){
    try {

      if(avatarFile){
        // criamos um FormData pois ele precisa ser armazenado como arquivo
        const fileUploadForm = new FormData();

        // dentro desse formulario vamos adicionar um campo chamado avatar
        // o backend esta esperando um campo chamado avatar
        // no campo avatar temos o avatarFile
        fileUploadForm.append("avatar", avatarFile)

        // requisicao para nossa api
        const response = await api.patch("/users/avatar", fileUploadForm);

        // a resposta nos retorna o avatar atualizado
        // a partir disso atualizamos o avatar do user
        user.avatar = response.data.avatar
      }
      
      await api.put("/users", user);
      
      // setItem serve criar chave e conteudo caso não exista
      // Quando a chave já existe o setItem irá substituir o conteudo
      user.password = ''
      user.new_password = ''
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));


      // vamos atualizar o setData
      setData({ user, token: data.token });
      alert("perfil atualizado")

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  } 

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      });
    }

  }, []);

  return(
    // compartilhar no contexto a funcao e o user (estado)
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile,
      user: data.user 
    }}
    >
      { children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };