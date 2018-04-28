import React from 'react';
import { Link } from "react-router-dom";
import MeetupActions from '../actions/MeetupActions.jsx';
import MeetupStore from '../stores/MeetupStore.jsx';

export default class Navbar extends React.Component{
    
    
    
    render(){
        return(
           
                <nav className="navbar navbar-expand-lg navbar-light justify-content-between navbar-expand-sm">
                    <span className="navbar-brand" href="#">
                    <Link className="nav-link nav-item theLogo" to="/"> grouped</Link></span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link nav-item theDashboard" to="/"> Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link nav-item theLogin" to="/login/">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
              );
    }
}