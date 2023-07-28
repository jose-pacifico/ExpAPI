import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import ProdutoList from './components/ProdutoList';

function App() {

  return (
    <div className="container text-center">
      <Navbar/>
      <ProdutoList />
    </div>
  )
}

export default App;
