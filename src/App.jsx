import React from 'react'
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ArticleList from './components/ArticleList'
import Article from './components/Article'
import NewComment from './components/NewComment'
import Comments from './components/Comments'


function App() {
  
  return (
    <>
    <main className='appContainer'>
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/articles/:article_id' element={<Article />} />
        <Route path='/articles/:article_id' element={<Comments />} />
        <Route path='/articles/:article_id/comments/newcomment' element={<NewComment />} />
      </Routes>
    </main>
      
    </>
  )
}

export default App
