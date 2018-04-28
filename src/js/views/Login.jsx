import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import MeetupStore from '../stores/MeetupStore.jsx';
import MeetupActions from '../actions/MeetupActions.jsx';
import { Redirect } from 'react-router-dom';

export default class Login extends Flux.View {
    
constructor(){
        super();
    
        this.login = this.login.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        
        this.state = {
            username: '',
            password: '',
            session: {}
        };
        
         //bind hears changes from the store 
            this.bindStore(MeetupStore, function(){
            // retreive any store data. This is good because about is cleaning the user info for security purposes 
            this.setState({
                username: "",
                password: "",
                session: MeetupStore.getSession()
            });
        });
    }
    
componentWillMount(){
        this.setState({
                event: MeetupStore.getEvent(this.props.match.params.id),
                session: MeetupStore.getSession()
            });
    }
   
handleUsername(e){
    let tempState = this.state;
    tempState.username = e.target.value;
    this.setState(tempState);
}

handlePassword(e){
    let tempState = this.state;
    tempState.password = e.target.value;
    this.setState(tempState);
}

 //this gets called when the user clicks and prevents the page from doing it's defualt behavior once submit is clicked
    login(e){
        e.preventDefault();
        MeetupActions.loadSession(this.state.username, this.state.password);
        return false;
    }
    
    
render(){
    
        if (typeof this.state.session.user_nicename !== 'undefined' ){ 
            return (<Redirect to="/"/>); 
            
        }
        
    
    return(
              // {/*--opening div  */}
        <div> 
            
           
            <div className="container">
                <form className="form-group" role="form" onSubmit={this.login}>       
                    <label htmlFor="formGroupExampleInput">User Name</label>
                    <input type="text" className="form-control form-control-lg" id="username" name="user" value={this.state.user} placeholder="insert username" onChange ={this.handleUsername} />
                    <label htmlFor="formGroupExampleInput2">Password</label>
                    <input type="text" className="form-control form-control-lg" id="password"  name="password" value={this.state.password} placeholder="insert password" onChange= {this.handlePassword} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
                </form>
            </div>
        </div>
        );       
    }
}