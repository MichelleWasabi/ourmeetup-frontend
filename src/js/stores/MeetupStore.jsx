import Flux from 'react-flux-dash';
export class MeetupStore extends Flux.Store {
   


     constructor(){
        super();
        this.state = {
            meetups: []
        };
         
     }
     
     
     getAllMeetups(){
         return this.state;
     }
    
    //  getAllMeetups(){
    //      let meetups = [];
         
    //      this.state.meetups.forEach( (meetup)=>{
    //          meetup = {};
    //          meetup.id = meetup.id;
    //          meetup.title= meetup.title;
    //      })
    //      return meetups;
    //  }
     
     getAllEvents(){
         let events = [];
         
         this.state.meetups.forEach((meetup)=>{
             meetup.events.forEach((event)=>{
                 event.meetup = {};
                 event.meetup.id = meetup.id;
                 event.meetup.title = meetup.title;
             })
             
            events =  events.concat(meetup.events)
         });
            return events;
     }   
    
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
        
        getEvent(id){
          let tempEvent = {};
            for(var i=0; i<this.state.meetups.length; i++){
                
                for(var j=0; j< this.state.meetups[i].events.length ; j++){
                    
                    if(this.state.meetups[i].events[j].id === parseInt(id) ){
                        
                        let updatedEvent = {};
                        updatedEvent = this.state.meetups[i].events[j];
                        updatedEvent.meetup = {};
                        updatedEvent.meetup.id = this.state.meetups[i].id;
                        updatedEvent.meetup.title = this.state.meetups[i].title;
                        
                        return updatedEvent;
                }
            }
        }
    }
    
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
    
    getMeetup(id){
       return this.state.meetups.find( (anELEMENT) => anELEMENT.id === parseInt(id));
        
        //this.state.meetups[i].id === id
    }
    // can also do this.state.meetups.find( (element    =>{element.id===id});
    

        
    _rsvpEventPositively(id){
        let tempState = this.state;
        tempState.meetups.forEach((meetup)=>{
            meetup.events.forEach((event)=>{
                if(event.id===id){
                    event.rspv="yes";
                }  
            })   
         
        });
         
        this.setStoreState(tempState).emit();
    } 
    
    setEvent(data){
        this.setState({
            meetups: data
        }).emit();    
    }
}


var meetupStore = new MeetupStore();
export default meetupStore;