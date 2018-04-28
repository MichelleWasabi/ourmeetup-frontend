import Flux from '@4geeksacademy/react-flux-dash';

class MeetupActions extends Flux.Action {
  
    
    rsvpEvent(id, userId, answer){
      var data = {
        "user": userId,
        "answer": answer
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
    //runs in order so fetch happens first or returns an error but if all good then goes onto the next step. Literally runs in order: fetch, response, answer, and then data
    loadSession(username, password){
      var data = {
        "username": username,
        "password": password
      };  
      fetch('https://try-wordpreess-michelle19.c9users.io/wp-json/jwt-auth/v1/token',
      {
        method: 'POST', //or 'POST'
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then( (response)=> {
        if(response.status !== 200) throw new Error(response);
        
        return response.json();
        
      }).then( (data) => {
        if(typeof(data.token) === "undefined") throw new Error(data.message);
    
        this.dispatch('MeetupStore.setSession', data);
      }).catch(error => {
        this.dispatch('MeetupStore.error', error);
      });
  }
    // loadSession(){
    //   // REST API AUTH
    
    //   // Simulating USER ID
    //   fetch('https://randomuser.me/api/?inc=id,name,picture')
    //   .then (res => res.json())
    //   .catch(error=>{
    //     // console.error('Error', error)
    //   })
    //   .then(response =>{
    //     this.dispatch('MeetupStore.setSession', response);
    //   });
      
    // }
    
}

    

var meetupActions = new MeetupActions();
export default meetupActions;