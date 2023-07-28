import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    estoque: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        nome: product.nome,
        preco: product.preco,
        estoque: product.estoque,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:3333/v1/produto/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:3333/v1/produto', formData);
      }
      setFormData({ nome: '', preco: '', estoque: '' });
      onCancelEdit(); 
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <div>
      <h2>{product ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Produto"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={formData.preco}
          onChange={handleChange}
        />
        <input
          type="number"
          name="estoque"
          placeholder="Estoque"
          value={formData.estoque}
          onChange={handleChange}
        />
        <button type="submit">{product ? 'Editar' : 'Adicionar'} Produto</button>
        {product && <button type="button" onClick={onCancelEdit}>Cancelar Edição</button>}
      </form>
    </div>
  );
};

export default ProductForm;