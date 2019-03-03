(function(){
// The following two classes have their behavior extended
// by composition.
class Listener {
  constructor ()
  {
      this.receiver = new EventReceiver()
  }
}

class Talker {
  constructor ()
  {
      this.emitter = new EventEmitter(this)
  }
}

// Create the hub managing event passing
const hub = new EventHub()

// Create our talking object
const talker = new Talker()

// Give it a hub to talk to
talker.emitter.registerOutgoingHub(hub)

// Create our listening object
const listener = new Listener();

// Subscribe to a type of event and create a callback
listener.receiver.subscribeToEvent(hub, 'TYPE0', (event, sender, hub) => {
  console.info('Event Callback executing for category:', event.category)
  console.info('Payload received:', event.payload)
  console.info('From sender: ', sender)
  console.info('From hub: ', hub)
})

// Our talker emits an event
talker.emitter.emit(new Event('TYPE0', { hello: 'world' }))

// Now the listener should receive and react to the event.
})()
