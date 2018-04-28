import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import Navbar from '../component/Navbar.jsx';
import Moment from "moment";
import MeetupStore from '../stores/MeetupStore.jsx';
import MeetupActions from '../actions/MeetupActions.jsx';
export default class Events extends Flux.View {
    
    constructor(props, context){
        super(props, context);
        this.login = this.login.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        
        this.state = {
            events: MeetupStore.getAllEvents(),
            username: '',
            password: '',
            session: {}
        };
            //bind hears changes from the store 
            this.bindStore(MeetupStore, function(){
            // retreive store data
            this.setState({
                event: MeetupStore.getEvent(this.props.match.params.id),
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
        // let nextMeetup = meetupStore.getMeetup(this.props.match.params.id);
        // this.setState(nextMeetup);
        
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
        
        let rsvpButtons = typeof (this.state.session.user_nicename) === 'undefined' ?
            <div>    
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                  Login to RSVP
                </button>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                    
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Member Login</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                              
                            <div className="modal-body">    
                                <form className="form-group" role="form" onSubmit={this.login}>       
                                    <label htmlFor="formGroupExampleInput">User Name</label>
                                    <input type="text" className="form-control form-control-lg" id="username" name="user" value={this.state.user} placeholder="insert username" onChange ={this.handleUsername} />
                                    <label htmlFor="formGroupExampleInput2">Password</label>
                                    <input type="text" className="form-control form-control-lg" id="password"  name="password" value={this.state.password} placeholder="insert password" onChange= {this.handlePassword} />
                                    <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
                                </form>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>

        :

            <div className="row rsvpBTN flex-nowrap">
                <div className="col-md-5">
                    <button type="button" className="btn btn-primary w-100 yesBTN" disabled={yesDisabled} onClick={() => MeetupActions.rsvpEvent(this.props.match.params.id, this.state.session.user_nicename, "yes")}>You're in!</button>
                </div>
                <div className="col-md-5">
                    <button type="button" className="btn btn-primary w-100 noBTN" disabled={noDisabled} onClick={() => MeetupActions.rsvpEvent(this.props.match.params.id, this.state.session.user_nicename, "no")}>You're out!</button>            
                </div>
            </div>;
        
        if(typeof this.state.event === 'undefined') return (<h2> event not found</h2>);
        let yesDisabled = "";
        let noDisabled = "";
        if(typeof this.state.event.meta_keys._rsvpYes !== 'undefined'){
            yesDisabled = this.state.event.meta_keys._rsvpYes.includes(this.state.session.user_nicename) ? "disabled" : "";
        }
        if(typeof this.state.event.meta_keys._rsvpNo !== 'undefined'){
            noDisabled = this.state.event.meta_keys._rsvpNo.includes(this.state.session.user_nicename) ? "disabled" : "";
        }

        
         {/* regular expressions google it regexr.com so you can more effectively use replace PRACTICE ON THEIR WEBSITE */}
         let newDate = Moment(this.state.event.meta_keys.day + "T" + this.state.event.meta_keys.time.replace(/:/g, ""));
         
         let theMeetup = typeof(this.state.event.meetup !== 'undefined' ? this.state.event.meetup: {ID:0, post_title: "Loading"});
       
        return(
            <div>
                {/*this is the nav and logo bar */}
                   <Navbar />
                
                        
                {/*this is the jumbotron info bar */}
                    <div className="jumbotron jumbotron-fluid eventHero">
                        <div className="container-fluid">
                            <div className="row">
                        {/*left side */}
                                <div className="col-md-8 jumboLeft">
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="eventDate">{newDate.format("MMM Do YYYY").toString()}</p>  {/* */}
                                            <h1 className="eventTitle">{this.state.event.post_title}</h1>
                                            <div className="row">
                                                <div className="col-md-2 text-center">
                                            
                                                    <img src="//placehold.it/50" className="rounded-circle" />
                                                </div>
                                                <div className="col-md-10 pt-1">
                                                    <span className="textBy">By</span>
                                                    <span className="link authorTitle"> Name</span>
                                                    <p><span className="text">From </span>
                                                     <span><Link className="meetupLink" to={"/meetup/" + theMeetup.ID}>{theMeetup.post_title}</Link></span> 
                                                  </p>
                                                </div>        
                                            </div>  
                                        </div>
                                    </div>
                                    </div>
                                
                            
                                {/*right side */}
                                <div className="col-md-4 jumboRight">
                                    <div className="attendance">
                                        <p><strong>Are you going?</strong> X people going</p>
                                    </div>
                                    {/* pulls the code from above for the yes and no rsvp buttons */}
                                    {rsvpButtons}
                                    
                                    <div className="row socialMedia flex-nowrap">
                                        <div className="col-md-6">
                                            <button type="button" className="btn-floating btn-sm btn-twi"><i className="fab fa-twitter"></i></button>
                                            <span>Tweet It</span>
                                        </div>
                                        <div className="col-md-6">
                                            <a type="button" className="btn-floating btn-sm btn-fb"><i className="fab fa-facebook-f"></i></a>
                                             <span>Share It</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    
                {/*body of page */}
                <div className="container-fluid">
                    <div className="row">
                    
                      {/*body right side...when using order you're saying MEDIUM and up will be second*/}
                        <div className="col-md-4 order-md-2">
                            <div className="card smallCard">
                                <div className="card-body">
                                    <div className="row cardInfo">
                                        <div>
                                            <span> <i className="far fa-clock"></i></span>
                                        </div>
                                        <div>
                                            <span className="card-date">{newDate.format("dddd, MMM, DD, YYYY").toString()}</span><br/>
                                            <span className="card-time">{newDate.format("h:mm a").toString()}</span><br/>
                                            <span className="card-schedule">Every first and last Tuesday of the month</span>
                                        </div>
                                    </div>
                                </div>
                                <img top ="w-100" src="https://via.placeholder.com/350x150" alt="map of the location" />                            
                                
                            </div>
                        </div>
                    
                    
                        {/*body left side*/}
                        <div className="col-md-8 order-md-1">
                            <div className="row">
                                <div className="col-12">
                                <img className="img-fluid eventPhoto" src="https://via.placeholder.com/500X300" alt="event image of..." />
                                <h5 className="details"><strong>Details</strong></h5>
                                <p className="bodyText">Snuggle up with cute kitties, hot lattes, and a book. We host this event twice a month for a place to socialize or maybe come out for alternative therapy.<br/><br/>There are a few rules to follow for this event:</p>
                                <ul>
                                    <li>You must purchase a beverage (e.g. coffee, tea, cocoa, etc)</li>
                                    <li>Stay as long as you like but only 30 minutes with each cat</li>
                                    <li>Be kind to cats and humans alike</li>
                                    <li>No children under 12 years old. This event is an escape for most people who attend</li>
                                    <li>Must wear headphones for phone calls and music</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>
                </div>
                
                {/* the footer */}
                <footer className="footer" id="footer">
	                <div className="container">
	                    <div className="row justify-content-between">
			                <div className="col-6">
				                <img className="img-fluid" src="https://placehold.it/50x50" alt="" />
			                </div>
                			<div className="col-6">
                				<ul className="footer__links list-inline text-right">
                					<li className="footer__link list-inline-item">Blog</li>
                					<li className="footer__link list-inline-item">Contact Us</li>
                				</ul>
                			</div>
			
		                    </div>
	                   </div>
                    </footer>
                </div>
            </div>

            );
    }
    
    
}