import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { EditPage, MainPage, PostPage, UpdatePage } from './pages';
function App() {
  return (
    <Switch>
      <Route exact path ="/" component={MainPage}/>
      <Route exact path="/posts" component={PostPage}/>
      <Route exact path="/posts/:id" component={PostPage}/>
      <Route exact path="/edit" component={EditPage}/>
      <Route exact path="/update/:id" component={UpdatePage}/>
      <Route exact path="/postsbycategory/:category" component={PostPage}/>
      <Route exact path="/postsbycategory/:category/:id" component={PostPage}/>
    </Switch>
  );
}

export default App;
