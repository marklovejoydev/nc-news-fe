import React from 'react'
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ArticleList from './components/ArticleList'
import Article from './components/Article'
import NewComment from './components/NewComment'
import Comments from './components/Comments'
import Topic from './components/Topic'
import SingleTopic from './SingleTopic'
import ErrorPage from './components/ErrorPage'


function App() {
  
  return (
    <>
    <main className='appContainer'>
      <Header />
      <div className='article-meta'>

      <Nav className='nav-block'/>
      </div>
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/articles/:article_id' element={<Article />} />
        <Route path='/articles/:article_id' element={<Comments />} />
        <Route path='/articles/:article_id/comments/newcomment' element={<NewComment />} />
        <Route path='/topics' element={<Topic />}/>
        <Route path='/topics/:topic' element={<SingleTopic />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
      
    </>
  )
}

export default App
