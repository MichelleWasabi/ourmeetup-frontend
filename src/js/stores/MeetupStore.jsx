import Flux from 'react-flux-dash';
export class MeetupStore extends Flux.Store {
   


     constructor(){
         super();
         this.state = {
    "meetups": [
        {
        "id": 87, 
        "title": "Miami Tech Meetup", 
        "thumbnail": "http://lorempixel.com/output/technics-q-c-100-100-1.jpg", 
        "events": [
            {
                "id": 34,
                "title": "React How-To",
                "day": "SATURDAY, MARCH 10",
                "time": "5:00 PM",
                "image": "http://lorempixel.com/output/technics-q-c-700-500-3.jpg",
                "rsvp": false
            },{
                "id": 56,
                "title": "Music+Coding",
                "day": "SATURDAY, MARCH 17",
                "time": "2:00 PM",
                "image": "http://lorempixel.com/output/technics-q-c-700-500-5.jpg",
                "rsvp": false
            },{
                "id": 67,
                "title": "Hardware hacking 101",
                "day": "THURSDAY, MARCH 22",
                "time": "6:00 PM",
                "image": "http://lorempixel.com/output/technics-q-c-700-500-7.jpg",
                "rsvp": false
            }
        ]
    },{
        "id": 886, 
        "title": "Wordpress Meetup",
        "thumbnail": "http://lorempixel.com/100/100/technics/", 
        "events": [
            {
                "id": 384,
                "title": "Wordpress for dummies",
                "day": "MONDAY, MARCH 12",
                "time": "6:30 PM",
                "image": "http://lorempixel.com/700/500/technics/",
                "rsvp": false
            },{
                "id": 776,
                "title": "Wordpress API",
                "day": "SATURDAY, MARCH 17",
                "time": "2:00 PM",
                "image": "http://lorempixel.com/700/500/technics/",
                "rsvp": false
            },{
                "id": 5677,
                "title": "Wordpress Guttenberg",
                "day": "THURSDAY, MARCH 22",
                "time": "5:30 PM",
                "image": "http://lorempixel.com/700/500/technics/",
                "rsvp": false
            }
        ]
    }
    ]
};
         
     }
     
     
     getAllMeetups(){
         return this.state;
     }
     
     getAllEvents(){
         let events = [];
         
         this.state.meetups.forEach((element)=>{
            events =  events.concat(element.events)
         });
         
         return events;
     }
    
    
}

var meetupStore = new MeetupStore();
export default meetupStore;

  