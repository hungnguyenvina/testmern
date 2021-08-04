import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'element-theme-default';
import { Button } from 'element-react';
import Root from './components/Root';
import { Route } from 'react-router-dom';
import CourseCategories from './components/Admin/CourseCategories';

import Courses from './components/Admin/Courses';
import CreateCourse from './components/Instructor/CreateCourse';
import UpdateCourse from './components/Instructor/UpdateCourse';
import UpdateCurriculum from './components/Instructor/UpdateCurriculum';
import Register from './components/Register';
import Login from './components/Login';
import Auth from './components/hoc/auth';
import ManageCourses from './components/Instructor/ManageCourses';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import Cart from './components/Cart';
class App extends React.Component {
  render() {
  return (
    <div className="App">
      <Root>
        <Route exact component={Auth(CourseList,true)} path="/"></Route>
        <Route exact component={Auth(CourseDetail,true)} path='/course/:id' />
        <Route exact component={Auth(Cart,false)} path="/cart"></Route>
       <Route exact path="/register" component={Register}></Route>
       <Route exact path="/login" component={Login}></Route>
         <Route exact path="/admin/course_categories" component={Auth(CourseCategories,false)}></Route>
         <Route exact path="/admin/courses" component={Courses}></Route>
         <Route exact path="/instructor/manage_course" component={Auth(ManageCourses,false)}></Route>
         <Route exact path="/instructor/create_course" component={Auth(CreateCourse,false)}></Route>
         <Route exact path="/instructor/update_course/:id" component={UpdateCourse}></Route>
         <Route exact path="/instructor/update_course_curriculum/:id" component={UpdateCurriculum}></Route>
       </Root>
    </div>
  );
  }
}

export default App;
