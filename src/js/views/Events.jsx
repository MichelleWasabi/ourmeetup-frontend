import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import Navbar from '../component/Navbar.jsx';

import MeetupStore from '../stores/MeetupStore.jsx';
import meetupActions from '../actions/MeetupActions.jsx';
export default class Events extends Flux.View {
    
    constructor(){
        super();
        
        this.state = {};
        //still use this call to pull from the server then use the function to request specific info
        meetupActions.getMeetups();
        this.bindStore(MeetupStore, function(){
            // retreive store data
             let tempEvent = MeetupStore.getEvent(this.props.match.params.id);
            this.setState(tempEvent);
        });
    }
    
    componentWillMount(){
        let tempEvent = MeetupStore.getEvent(this.props.match.params.id);
        this.setState(tempEvent);
    }
        // let nextMeetup = meetupStore.getMeetup(this.props.match.params.id);
        // this.setState(nextMeetup);
    
    
     handleStoreChanges(data){
        let tempEvent = MeetupStore.getEvent(this.props.match.params.id);
        // let tempEvent = tempMeetup.events.find( (event) => { return event.id === parseInt(this.props.match.params.id) })
        this.setState(tempEvent);
    }
    
    render(){
        
       
        // let rsvpButtons = "";
        if(typeof this.state.day === 'undefined') return (<h2> event not found</h2>);
        // if(this.state.events.rsvp === "yes"){
        //     rsvpButtons =    
        //         <div className="row rsvpBTN flex-nowrap">
        //             <div className="col-md-5">
        //                 <button type="button" className="btn btn-primary w-100 yesBTN" disabled onClick={() => meetupActions.rsvpEventPositively(this.props.match.params.id)}>Yes</button>
        //             </div>
        //             <div className="col-md-5">
        //                 <button type="button" className="btn btn-primary w-100 noBTN">No</button>
        //             </div>
        //         </div>;
            
        // }else if(this.state.events.rsvp === "no"){
        //     rsvpButtons = 
        //         <div className="row rsvpBTN flex-nowrap">
        //             <div className="col-md-5">
        //                 <button type="button" className="btn btn-primary w-100 yesBTN" onClick={() => meetupActions.rsvpEventPositively(this.props.match.params.id)}>Yes</button>
        //             </div>
        //             <div className="col-md-5">
        //                 <button type="button" className="btn btn-primary w-100 noBTN">No</button>
        //             </div>
        //         </div>
        //     ;
        // }else{
        //     rsvpButtons = 
        //         <div className="row rsvpBTN flex-nowrap">
        //             <div className="col-md-5">
        //                 <button type="button" className="btn btn-primary w-100 yesBTN" onClick={() => meetupActions.rsvpEventPositively(this.props.match.params.id)}>Yes</button>
        //             </div>
        //             <div className="col-md-5">
        //                 <button type="button" className="btn btn-primary w-100 noBTN">No</button>
        //             </div>
        //         </div>
        //     ;
        // }
       
       
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
                                            <p className="eventDate">{this.state.day}</p>
                                            <h1 className="eventTitle">{this.state.title}</h1>
                                            <div className="row">
                                                <div className="col-md-2 text-center">
                                            
                                                    <img src="//placehold.it/50" className="rounded-circle" />
                                                </div>
                                                <div className="col-md-10 pt-1">
                                                    <span className="textBy">By</span>
                                                    <span className="link authorTitle"> Name</span>
                                                    <p><span className="text">From </span>
                                                       {/*  <Link className="meetupLink" to={"/meetup/"}>{this.state.meetup.title}</Link>*/}

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
                                    <div className="row rsvpBTN flex-nowrap">
                                        <div className="col-md-5">
                                            <button type="button" className="btn btn-primary w-100 yesBTN" onClick={()=>meetupActions.rsvpEventPositively(this.props.match.params.id)}> Yes</button>
                                        </div>
                                        <div className="col-md-5">
                                            <button type="button" className="btn btn-primary w-100 noBTN">No</button>
                                        </div>
                                    </div>
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
                                            <span className="card-date">Tuesday, March 13, 2018</span><br/>
                                            <span className="card-time">6:00 PM to 9:00 PM</span><br/>
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