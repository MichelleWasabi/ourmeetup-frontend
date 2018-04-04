import Flux from '@4geeksacademy/react-flux-dash';

class MeetupActions extends Flux.Action {
    
    rsvpEventPositively(id){
        this.dispatch('MeetupStore.rsvpEventPositively', id);
    
    }
    getMeetups(){
        fetch('https://assets.breatheco.de/apis/meetup/meetups')
          .then(function(response) {
            return (response.json());
          })
          .then((content) => {
            console.log(content)
            this.dispatch("MeetupStore.setEvent", content)
          })
          .catch((errorMsg) => {
            console.log("Error", errorMsg)
          });
    }
    
}


var meetupActions = new MeetupActions();
export default meetupActions;