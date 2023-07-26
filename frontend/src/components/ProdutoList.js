import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([]);
  const apiURL = "http://localhost:3333/v1/produto";

  useEffect(() => {
    fetchProdutos();
  }, []);


  const fetchProdutos = async () => {
    try {
      const response = await axios.get(apiURL);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de produtos:', error);
    }
  };

  const rmProduto = async (produtoID) => {
    try {
      await axios.delete(`http://localhost:3333/v1/produto/${produtoID}`);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Estoque</th>
            <th scope="col">Criado em</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
        {produtos.map((produto, index) => (
          <>
          <tr>
            <td key={index}>{produto.nome}</td>
            <td key={index}>{produto.preco}</td>
            <td key={index}>{produto.estoque}</td>
            <td key={index}>{produto.createdAt}</td>
            <td key={index}> 
              <a href="#!"><i className="bi bi-pencil-fill" onClick={() => rmProduto(produto.id)}></i></a>
              |
              <a href="#!"><i className="bi bi-trash3-fill" onClick={() => rmProduto(produto.id)}></i></a>
            </td>
          </tr>
          </>
        ))}
        </tbody>
      </table>
      <ul>
        
      </ul>
    </div>
  );
};

export default ProdutoList;
