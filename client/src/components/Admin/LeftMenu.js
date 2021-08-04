import { Menu } from "element-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <React.Fragment>
                <Menu defaultActive="2" className="el-menu-vertical-demo" >
         
          <Menu.Item index="2"><i className="el-icon-menu"></i><Link style={{textDecoration:'none'}} to='/admin/course_categories'>Course categories</Link></Menu.Item>
          <Menu.Item index="3"><i className="el-icon-setting"></i><Link style={{textDecoration:'none'}} to='/admin/courses'>Courses</Link></Menu.Item>
        </Menu>
            </React.Fragment>
        );
    }
}
 
export default LeftMenu;