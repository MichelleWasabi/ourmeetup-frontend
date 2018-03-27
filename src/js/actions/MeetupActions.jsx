import Flux from 'react-flux-dash';

class MeetupActions extends Flux.Action {
    
    rsvpEventPositively(id){
        this.dispatch('MeetupStore.rsvpEventPositively', id);
    
    }
    getMeetups(){
        fetch('https://assets.breatheco.de/apis/meetup/meetups')
          .then(function(response) {
            return (response.json());
          })
          .then(function(content){
            console.log(content)
            this.dispatch("MeetupStore.setEvent", content)
          })
          .catch(function() {
            console.log("Error")
          });
    }
    
}


var meetupActions = new MeetupActions();
export default meetupActions;