import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import api from '../../services/ip';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!email | !nome | !senha) {
      setError("Preencha todos os campos");
      return;
    }
    var data = {
      'email': email,
      'senha': senha,
      'nome': nome
    }

    var config = {
      method: 'POST',
      url: api.url_base_api + '/usuario',
      data: data
    };
    try {
      const response = await axios(config);
      if (response.status == 201) {
        const res = signup(email, senha);
        if (res) {
          setError(res);
          return
        }
        navigate("/");
      } else {
        setError(response.data.error.error);
        return
      }

    } catch (error) {
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
          type="nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
