import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProdutoList = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsEditing(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <button type="button" className="btn btn-success" onClick={handleAdd}>Adicionar Produto</button>
      {isEditing  ? (
        <ProductForm product={selectedProduct} onCancelEdit={handleCancelEdit} />
      ) : (
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
        {produtos.map((produto) => (
          <>
          <tr>
            <td key={produto.id}>{produto.nome}</td>
            <td key={produto.id}>{produto.preco}</td>
            <td key={produto.id}>{produto.estoque}</td>
            <td key={produto.id}>{produto.createdAt}</td>
            <td key={produto.id}> 
              <a href="#!"><i className="bi bi-pencil-fill" onClick={() => handleEdit(produto)}></i></a>
              |
              <a href="#!"><i className="bi bi-trash3-fill" onClick={() => rmProduto(produto.id)}></i></a>
            </td>
          </tr>
          </>
        ))}
        </tbody>
      </table>
      )
      }
    </div>
  );
};

export default ProdutoList;
