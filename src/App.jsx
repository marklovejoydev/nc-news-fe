import React from 'react'
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ArticleList from './components/ArticleList'
import Article from './components/Article'


function App() {
  
  return (
    <>
    <main className='appContainer'>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/:article_id' element={<Article />} />
      </Routes>
    </main>
      
    </>
  )
}

export default App
