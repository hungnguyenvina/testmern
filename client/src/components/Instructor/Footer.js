import { Menu } from "element-react";
import React, { Component } from "react";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <React.Fragment>
                  <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
        <Menu.Item index="1">MERN Online Course Website - copyright by Nguyen The Hung, 2019 (vt2804@gmail.com)</Menu.Item>
     
        
      </Menu>
            </React.Fragment>
        );
    }
}
 
export default Footer;