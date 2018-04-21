import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import Navbar from '../component/Navbar.jsx';
import Moment from "moment";

import MeetupStore from '../stores/MeetupStore.jsx';
import meetupActions from '../actions/MeetupActions.jsx';
export default class Meetup extends Flux.View {
    
    
     constructor(){
        super();
        
        this.state = {
            events: MeetupStore.getAllEvents()
        };
            //bind hears changes from the store 
            this.bindStore(MeetupStore, function(){
            // retreive any store data
            this.setState({
                events: MeetupStore.getAllEvents()
            });
        });
    }
       
    componentWillMount(){
        let tempEvent = MeetupStore.getMeetup(this.props.match.params.id);
        this.setState(tempEvent);
    }
  
    
     handleStoreChanges(data){
        //console.log('change on the state', todoStore.getAllTasks());
        let tempMeetup = MeetupStore.getMeetup(this.props.match.params.id);
        let tempEvent = tempMeetup.events.find( (event) => { return event.ID === parseInt(this.props.match.params.id) })
        this.setState(tempEvent);
    }
    
    render(){
        
        if(typeof this.state.post_title === 'undefined') return (<h2> event not found</h2>);
        let newDate = Moment(this.state.meta_keys.day[0] + "T" + this.state.meta_keys.time[0].replace(/:/g, ""));

 
        var meetupEvents = this.state.events.map((event) => {
            event.meetup = typeof(event.meetup) === 'undefined'? {ID: 0, post_title : ""} : event.meetup;
            return(
            <div key={event.ID} className="card mb-5">
                <div className="card-header">
                    <h4>{newDate.format("MMM Do YYYY").toString()}</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <h5>{event.meta_keys.time}</h5>
                        </div>
                        <div className="col-md-9">
                            <h5 className="card-title">{event.post_title}</h5>
                            <Link to={"/events/" + event.ID} className="btn btn-primary">View</Link>
                        </div>
                    </div>
                </div>
            </div>

           );
        });


        return(
        <div>
         {/*   */}   
            <Navbar/>
            
            <div className="container-fluid mt-4">
                <div className="card w-100">
                   <div className="card-body"> 
                    <div className="row">
                    
                     {/* LEFT: this the hero image with the group photo */}
                        <div className="col-6">
                            <img className="card-img-top" src="https://via.placeholder.com/600x350" alt="Card image cap"></img>
                        </div>
                        
                         {/* RIGHT: this the group details on the*/}
                        <div className="col-6">
                                <h2 className="card-title">{this.state.post_title}</h2>
                                <span className="card-subtitle text-muted">Location</span><br></br>
                                <h6 className="card-text">Miami, FL</h6>
                                <br></br>
                                <br></br>
                                <span className="card-subtitle text-muted">Members</span><br></br>
                                <h6 className="card-text">777</h6>
                                <br></br>
                                <br></br>
                                <span className="card-subtitle text-muted">Organizers</span><br></br>
                                <h6 className="card-text">Daniel Ocampo</h6>
                                <br></br>
                                <br></br>
                                    <div className="row">
                                        <div className="col-6">
                                <Link to="/event/1" className="btn btn-danger">Join Us</Link>
                            </div>
                                    </div>
                                        </div>
                              
                            </div>
                        </div>
                        
                    </div>  
               {/* the navigatio for later  */}
                   {/* <div className="row">
                        <div className="col-8">
                        <nav className="nav nav-pills nav-fill">
                          <a className="nav-item nav-link" href="#">Our Group</a>
                          <a className="nav-item nav-link disabled" href="#">Meet Ups</a>
                          <a className="nav-item nav-link disabled" href="#">Members</a>
                          <a className="nav-item nav-link disabled" href="#">Photos</a>
                          <a className="nav-item nav-link disabled" href="#">Discussions</a>
                          <a className="nav-item nav-link disabled" href="#">More</a>
                        </nav>
                        </div>
                    </div>*/}
                    
            <br></br>
                <div className="row">
                {/* LEFT Side*/}
                    <div className="col-md-8">
                        <div className="card w-100 mt-2">
                            <div className="card-body">
                                <span className="card-subtitle text-muted">Location</span>
                                <p className="nextMeetup">Next Meetup</p>
                                <h2 className="card-title">Group Name</h2>
                                    <h6 className="card-text">Sed tortor enim, varius sed maximus vel, scelerisque id leo. Phasellus congue lectus quis blandit volutpat. Ut eget venenatis magna. Nullam purus lacus, eleifend at pellentesque a, dignissim at ante. Duis hendrerit interdum libero quis feugiat. Nam et ex vel lectus volutpat iaculis ac vitae augue. Donec mattis, neque sed rutrum egestas, velit est vestibulum sem, ac ultricies massa metus non nisi. Phasellus scelerisque dolor at felis ullamcorper condimentum. </h6>
                                   
                                <span className="card-subtitle text-muted">7 going</span>
                            </div>
                        </div>
                        
                    </div>
               
                            {/* RIGHT Side*/}
                    <div className="col-md-4">
                        <img className="card-img-top mb-3" src="https://via.placeholder.com/350x200" alt="Card image cap"></img>
                            <div className="row">
                                <div className="col-12">
                                    <Link to="/event/2" className="btn btn-info text-align-center w-100 mb-3">Attend</Link><br></br>
                                </div>
                            </div>
                        <span className="card-subtitle text-muted">7777 SW 77 st, Miami FL 33177</span>
                        
                         {/*adds events dynamically */}
                
                        <div className="row">
                            <div className="col-12">
                                    {meetupEvents}
                            </div>
                        </div>
                    </div>
                </div>        
            </div>     
        </div> 
        
    
            );
            
    }
}