import Flux from '@4geeksacademy/react-flux-dash';
export class MeetupStore extends Flux.Store {

    constructor(){
        super();
            this.state = {
                "meetups": [],
                "events": [],
                "session": {}
            };
     }
     
     
    getAllMeetups(){
        return this.state.meetups;
     }
    
     getAllEvents(){
         //if we just used this.state.events it would ony return a list of events and would ignore the name of the meetups so we proceed with forEach and find
       let eventSend = this.state.events;
       eventSend.forEach((theEvent) => {
           let theMeetup = this.state.meetups.find( (meetup) => {
               //in the meta key it's a string for the ID but in the main (object) it's an integer
               return parseInt(theEvent.meta_keys._meetup[0]) === meetup.ID;
           });
           theEvent.meetup ={};
           theEvent.meetup = theMeetup;
       });
       return eventSend;
     }
     
     
    //  loadSession(){
    //      return this.state.session;
    //  }
     
     
     
    //      let events = [];
         
    //      this.state.meetups.forEach((meetup)=>{
    //          meetup.events.forEach((event)=>{
    //              event.meetup = {};
    //              event.meetup.id = meetup.id;
    //              event.meetup.title = meetup.title;
    //          })
             
    //         events =  events.concat(meetup.events)
    //      });
    //         return events;
    //  }   
    
    //this one finds the specific event and allows you to click and go to that specific meetup
    // getEvent(id){
    //     let tempEvent = {};
        
        // within meetups "find" and call it "meetup" you create variable then use the variable. Do you see below? Ok so we can do this and we can do a for loop shown below this
        // return this.state.meetups.find( (meetup) => {
        //     //let tempmeetup = meetups.events;
        //     tempEvent = meetup.events.find( (event) => {
        //         if (event.id === parseInt(id)){
        //             event.meetup = {};
        //             event.meetup.id = meetup.id;
        //             event.meetup.title = meetup.title;
        //             return event;
        //         }
        //     })
            
        //     return tempEvent != undefined;
            
        // });
        // return this.state.meetups.find( (meetup))
        
        
        
     getEvent(ID){
        let newEvent = this.state.events.find((theEvent)=>{
            return parseInt(ID) === theEvent.ID;
        }); 
            if(typeof(newEvent) !== "undefined"){
                newEvent.meetup = {};
                newEvent.meetup = this.state.meetups.find((theMeetup) =>{
                    return theMeetup.ID === parseInt(newEvent.meta_keys._meetup[0]);
                });
            }
             return newEvent;
     }
       
     
    //     getEvent(ID){
    //       let tempEvent = {};
    //             for(var j=0; j< this.state.events[j]; j++){
                    
    //                 if(this.state.events[j].ID === parseInt(ID)){
                        
    //                     let updatedEvent = {};
    //                     updatedEvent = this.state.events[j];
    //                     updatedEvent.meetup = {};
    //                     updatedEvent.meetup.ID = this.state.meetups[j].ID;
    //                     updatedEvent.meetup.title = this.state.meetups[ID].post_title;
                        
    //                     return updatedEvent;
    //             }
    //           return tempEvent; 
    //         }
    //     }
    
    
    
    
    // getMeetup(id) {
    //     let tempMeetup = {};
    //     for(var i=0; i<this.state.meetups.length; i++){
            
    //         if(this.state.meetups[i].id === parseInt(id) ){
                
    //             let updatedMeetup = {};
    //             updatedMeetup = this.state.meetups[i];
    //             updatedMeetup.meetup = {};
    //             updatedMeetup.meetup.id = this.state.meetups[i].id;
    //             updatedMeetup.meetup.title = this.state.meetups[i].title.id;
    //         return updatedMeetup;
    //         }   
    //     }
    // }
    
    getMeetup(ID){
       return this.state.meetups.find( (anELEMENT) => anELEMENT.ID === parseInt(ID));
        
        //this.state.meetups[i].id === id
    }
    // can also do this.state.meetups.find( (element    =>{element.id===id});
    

      //use the _ to represent connection to the action   
    //_rsvpEventPositively(id){
        /*let tempState = this.state;
       // tempState.meetups.forEach((meetup)=>{
            // meetup.events.forEach((event)=>{
                if(event.id=== parseInt(id)){
                    event.rsvp="yes";
                }  
            })   
         
        });
         // have you setStoreState (this WRITES whereas this.state READS) inside the store and "emit" says "HEY I CHANGED!"
        this.setStoreState(tempState).emit();
    } */
    
    // _rsvpEventNegative(id){
    //     let tempState = this.state;
    //     tempState.meetups.forEach((meetup)=>{
    //         meetup.events.forEach((event)=>{
    //             if(event.id=== parseInt(id)){
    //                 event.rsvp="no";
    //             }  
    //         })   
         
    //     });
    //      // have you setStoreState (this WRITES whereas this.state READS) inside the store and "emit" says "HEY I CHANGED!"
    //     this.setStoreState(tempState).emit();
    // } 
    
    _setMeetups(data){
        let tempState = this.state;
        tempState.meetups = data;
        this.setStoreState(tempState).emit();    
    }
    
    _setEvents(data){
        let tempState = this.state;
        tempState.events = data;
        this.setStoreState(tempState).emit();    
    }
    
    _setSession(data){
        let tempState = this.state;
        tempState.session = data;
        this.setStoreState(tempState).emit();
    }
    getSession(){
        return this.state.session;
        // returns state of session
    }
    
    _rsvpSuccess(id, user){
        let tempState = this.state;
        let updatedEvent = tempState.events.find( (theEvent) => id = theEvent.ID);
        updatedEvent.meta_keys._rsvpUes.push(user);
        this.setStoreState(tempState).emit();
    }
}


var meetupStore = new MeetupStore();
export default meetupStore;