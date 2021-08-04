import { Layout } from "element-react";
import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import LeftMenu from "./LeftMenu";

class AdminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <React.Fragment>
                <Header {...this.props}></Header>
                <Layout.Row>
                    <Layout.Col span="4">
                        <LeftMenu {...this.props}></LeftMenu>
                    </Layout.Col>
                    <Layout.Col span="20">
                        {this.props.children}
                    </Layout.Col>
                </Layout.Row>
                <Footer></Footer>
            </React.Fragment>
        );
    }
}
 
export default AdminLayout;