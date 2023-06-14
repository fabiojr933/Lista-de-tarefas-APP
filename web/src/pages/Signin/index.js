import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import api from '../../services/ip';

const Signin = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    var data = {
      'email': email,
      'senha': senha,
    }

    var config = {
      method: 'POST',
      url: api.url_base_api + '/usuario/login',
      data: data
    };
    try {
      const response = await axios(config);
      if (response.status == 200) {
        var token = response.data['sucesso'].token;
        localStorage.setItem("token_tarefa", JSON.stringify({ token }));
        navigate("/tarefa");
      } else {
        setError(response.data.error.error);
        return
      }
    } catch (error) {
      console.log(error)
      setError(error.response.data.error.error);
    }
  };

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
