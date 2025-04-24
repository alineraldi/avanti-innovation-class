import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import searchIcon from '../img/search.png';
import logo from "../img/logo.png";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchUser = async () => {
    setError("");
    setUserData(null);
    setLoading(true);
    if (!username) {
      setError("Por favor, insira um perfil para ser pesquisado.");
      return;
    }

    try {
      console.log(`Fetching user data for ${username}...`);  
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log("User data:", response.data);  
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err); 
      setError("Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if(e.key === 'Enter' || e.type === "click") {
      fetchUser();
    }
  }

  return (
    <div className="">
      <div className="input-box mt-3">
      <p className="text-gray-800 text-xs uppercase opacity-50 hover:text-white"><a href="https://github.com/alineraldi" target="_blank" rel="noopener noreferrer">alineraldi @ github</a></p>
      <img src={logo} alt="logo" className="w-100 mx-auto my-4" />
        <div className="flex mb-4">
          {loading ? (
              <div className="flex-1 border bg-primary text-white rounded-l-lg p-2 focus:outline-none border-white h-12 w-full">
              <h1>🔄 Carregando...</h1>
            </div>
          ): (
            <input
            type="text"
            className="flex-1 border bg-white text-blue rounded-l-lg p-2 focus:outline-none border-white h-12 w-full"
            placeholder="Digite um usuário do Github"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleSearch}
          />
          )}        
          <button
            onClick={handleSearch}
            className="bg-darkblue text-white px-4 py-2 rounded-r-lg focus:bg-blue"
          >
            <img className='w-3 object-contain' src={searchIcon} alt="search-icon" />
          </button>
        </div>

        {error && <div className="border border-white-500 rounded p-3 text-red-500 bg-white text-center my-4">{error}</div>}

        {userData && (
          <div className="text-white text-center">
            {console.log(userData)}
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-x lowercase">{userData.login}</h2>
            <h2 className="text-xl font-bold">{userData.name || "Usuário sem bio"}</h2>
            <p className="text-yellow"><i>{userData.bio}</i></p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
// APRENDI ENQUANTO DESENVOLVIA
// O atributo 'rel="noopener noreferrer"' é usado por motivos de segurança e privacidade ao utilizar target="_blank".
// - 'noopener' garante que a nova página não possa acessar a página original via window.opener, o que evita que páginas maliciosas manipulem a página de origem.
// - 'noreferrer' impede que o navegador envie a URL da página de origem para a nova página, o que aumenta a privacidade ao não revelar de onde o usuário veio.
// Essa é uma prática recomendada ao abrir links em uma nova aba (target="_blank") para proteger contra possíveis vulnerabilidades.


              className="text-white hover:text-darkblue"
            >
              Ir para o perfil do GitHub de {userData.name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
