import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';


// Мы будем загружать Posts и User компоненты
// через метод React lazy loading, добавленный в версии 16.6
// import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

const Posts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  state = {
    showPosts: false
  }

  modeHandler = () => {
    this.setState(prevState => {
      return {showPosts: !prevState.showPosts};
    })
  }

  render() {
    return (
      // lazy() можно использовать не только в Route компоненте
      // но обязательно нужно добавлять Suspense, так как появляется ошибка, что
      // отсутствует fallback
        <React.Fragment>
          <button onClick={this.modeHandler}>
            Toggle mode
          </button>
          {this.state.showPosts ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Posts />
              </Suspense>
          ): <User />}
        </React.Fragment>

      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route path="/posts" render={() =>
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //     } />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
