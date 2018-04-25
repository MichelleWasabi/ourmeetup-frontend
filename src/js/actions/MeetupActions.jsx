import Flux from '@4geeksacademy/react-flux-dash';

class MeetupActions extends Flux.Action {
    
    rsvpEventPositively(id, userId){
      var data = {
        user: userId,
        answer: "yes"
      };  
      fetch("https://try-wordpreess-michelle19.c9users.io/wp-json/sample_api/v1/events/rsvp/" + id,
      {
        method: 'PUT', //or 'POST'
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(data=> {
        if(data.status !== 200){
          throw new Error(data);
        }
        this.loadApiEvents();
      });
  }
    
    rsvpEventNegative(id, user){
      
      fetch("https://try-wordpreess-michelle19.c9users.io/wp-json/sample_api/v1/events/rsvp/" + id)

      this.dispatch('MeetupStore.rsvpEventNegative', id);
    }
    
    // https://assets.breatheco.de/apis/meetup/meetups   old one 
    
    loadApiMeetups(){
        fetch('https://try-wordpreess-michelle19.c9users.io/wp-json/sample_api/v1/meetups')
          .then(function(response) {
            return (response.json());
          })
          .then((content) => {
            // console.log(content) replaced with an error check to validate if data is what we are looking for so if content does not arrive with code then our data arrived correctly 
            if(typeof(content.code) !=="undefined" ){
              throw new Error(content.message);
            }
            this.dispatch("MeetupStore.setMeetups", content);
          }).catch((errorMsg) => {
            console.log("Error", errorMsg);
          });
    }
    
    loadApiEvents(){
        fetch('https://try-wordpreess-michelle19.c9users.io/wp-json/sample_api/v1/events')
          .then(function(response) {
            return (response.json());
          })
          .then((content) => {
            // console.log(content) replaced with an error check to validate if data is what we are looking for so if content does not arrive with code then our data arrived correctly 
            if(typeof(content.code) !=="undefined" ){
              throw new Error(content.message);
            }
            this.dispatch("MeetupStore.setEvents", content);
          }).catch((errorMsg) => {
            console.log("Error", errorMsg);
          });
    }
    
    loadSession(){
      // REST API AUTH
    
      // Simulating USER ID
      fetch('https://randomuser.me/api/?inc=id,name,picture')
      .then (res => res.json())
      .catch(error=>{
        // console.error('Error', error)
      })
      .then(response =>{
        this.dispatch('MeetupStore.setSession', response);
      });
      
    }
    
}

    

var meetupActions = new MeetupActions();
export default meetupActions;