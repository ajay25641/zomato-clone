import { BrowserRouter, Route } from 'react-router-dom';

import React from 'react'
import Home from "./Home";
import Filter from './Filter';
import Details from './Details';
import { Header } from './Header';
const Router = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Route exact path='/' component={Home} />
      <Route path='/filter' component={Filter} />
      <Route path='/details' component={Details}/>

    </BrowserRouter>
  )
}
export default Router;