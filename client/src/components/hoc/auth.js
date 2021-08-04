import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadAuthenticatedUser} from '../../redux/actions/userAction';
import {hoc} from './hoc';

export default function(ComposedComponent,noNeedAuthenticate) {

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true
        }
    }

    checkUserAuthenticate(props) {
        //alert('componentWillReceiveProps');
        console.log('componentWillReceiveProps');
        console.log(props);
        if(!props.user) {
            //alert('not authenticate111'+noNeedAuthenticate);
            if(noNeedAuthenticate) {
                this.setState({loading: false});
            }
            else{
                this.props.history.push('/login');
            }
        }
        else {
            //alert('else');
            if(props.user.isAuth1) {
                //alert('is authenticated');
                this.setState({loading: false});
            }
            else {
                //alert('not authenticate');
                if(noNeedAuthenticate) {
                    this.setState({loading: false});
                }
                else{
                    this.props.history.push('/login');
                }
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        //alert('componentWillReceiveProps='+noNeedAuthenticate);
        this.checkUserAuthenticate(nextProps);
        
      }

    componentDidMount(){
        //alert('componentDidMount');
        this.checkUserAuthenticate(this.props);
        this.props.loadAuthenticatedUser();
    }

    render() { 
        if(this.state.loading) {
            return (
                <div>
                    Loading....
                </div>
            )
        }
        return ( 
            <ComposedComponent {...this.props}  user={this.props.user} />
        );
    }
}

const mapStateToProps = state => {
    console.log(state.users);
    return {
      user: state.users.user
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    loadAuthenticatedUser: () => dispatch(loadAuthenticatedUser())
  });
  
  return connect(mapStateToProps,mapDispatchToProps)(Authentication);
 
}