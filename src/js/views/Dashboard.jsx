import React from "react";
import Flux from "react-flux-dash";
import { Link } from "react-router-dom";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Navbar from '../component/Navbar.jsx';
import MeetupStore from '../stores/MeetupStore.jsx';
import MeetupActions from '../actions/MeetupActions.jsx';

export default class Dashboard extends Flux.View {
    
    constructor(){
        super();
        this.state = {
            events:[]
        };
        MeetupActions.getMeetups();
        this.bindStore(MeetupStore);
    }
    
    handleStoreChanges() {
        this.setState({
                events: MeetupStore.getAllEvents(),
            }); 
        
    }
    // componentWillMount(){
        
    // }
    
    render(){
        // Render the Calendar
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        
        
        var meetupEvents = this.state.events.map((event) => {
            return(
            <div key={event.id} className="card mb-5">
                <div className="card-header">
                    <h3>{event.day}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2">
                            <h5>{event.time}</h5>
                        </div>
                        <div className="col-md-10">
                            <h5 className="card-title">{event.title}</h5>
                            <h6>
                            <Link className="card-text" to={"/meetup/" + event.meetup.id}>{event.meetup.title}</Link>
                            </h6>
                            <Link to={"/events/" + event.id} className="btn btn-primary">View</Link>
                        </div>
                    </div>
                </div>
            </div>

           );
        });
    
        return(
            <div>
            
              <Navbar />
              
            <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h1 className="display-4 jumboTitle">Let's Get Together</h1>
                    <p className="lead jumboSubTitle">a place to meet new friends and maintain current friendships</p>
                </div>
            </div>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                 
                   {/*adds events dynamically */}
                
                        <div className="row">
                            <div className="col-12">
                                    {meetupEvents}
                            </div>
                        </div>
                
                   
                    </div>
                    {/* the calendar */}
                        <div className="col-md-4">
                            <InfiniteCalendar
                                width={400}
                                height={600}
                                selected={today}
                                disabledDays={[0,6]}
                                minDate={lastWeek}
                            />
                        </div>
                  {/*divs belonging to the container */}
                  </div>
                  </div>
                
        
        
                {/* the footer */}
                <footer className="footer" id="footer">
	                <div className="container">
	                    <div className="row justify-content-between">
                            <div className="col-6">
                                <img className="img-fluid" src="http://placehold.it/50x50" alt="" />
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

            );
    }
    
    
}