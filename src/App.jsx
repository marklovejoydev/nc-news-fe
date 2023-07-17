import React from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ArticleList from './components/ArticleList'


function App() {

  

  return (
    <>
    <div className='appContainer'>
      <Header />
      <Nav />
      <ArticleList />
    </div>
      
    </>
  )
}

export default App
