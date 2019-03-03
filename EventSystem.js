/**
 ** An event system written in JavaScript.
 ** Messages are represented by class Event.
 ** An EventHub is the central piece which receives
 ** events and dispatches them to relevant subscribers.
 **/
class Event
{
  constructor (category, payload = {})
  {
    this.category = category
    this.payload  = payload
  }
}



class EventHub
{
  constructor ()
  {
    this.subscriptions = {} // keys: categories of events, values: array of eventReceivers
  }


  /**
   * @param {Event} event
   * @param {EventEmitter} sender
   */
  receiveEvent(event, emitter)
  {
    for (const subscriber of this.subscriptions[event.category])
      subscriber.receiveEvent(event, emitter, this)
  }

  /**
   * @param {EventReceiver} subscriber
   * @param {Event.category} eventCategory
   */
  registerSubscription(subscriber, eventCategory)
  {
    if (!Object.keys(this.subscriptions).includes(eventCategory))
      this.subscriptions[eventCategory] = []

    if (!this.subscriptions[eventCategory].includes(subscriber))
      this.subscriptions[eventCategory].push(subscriber)
  }
}




class EventEmitter
{
  constructor (parent, ...eventHubs)
  {
    this.parent = parent
    this.emissionHubs = [...eventHubs]
  }

  registerOutgoingHub(hub)
  {
    this.emissionHubs.push(hub)
  }

  /**
   * Emit an Event to all the Emitter's registered
   * event hubs.
   * @param {Event} event
   */
  emit(event)
  {
    for (const hub of this.emissionHubs)
      hub.receiveEvent(event, this.parent)
  }

  /**
   * Send an event to a specified event hub.
   * @param {EventHub} hub The event hub to send the Event to
   * @param {Event} event The event to send
   */
  emitTo(hub, event)
  {
    hub.receiveEvent(event, this)
  }
}




class EventReceiver
{
  constructor ()
  {
    this.eventCallbacks = {}
  }

  subscribeToEvent(hub, eventCategory, callback)
  {
    hub.registerSubscription(this, eventCategory)

    if (!Object.keys(this.eventCallbacks).includes(eventCategory))
      this.eventCallbacks[eventCategory] = []

    this.eventCallbacks[eventCategory].push(callback)
  }

  receiveEvent(event, sender, hub)
  {
    for (const callback of this.eventCallbacks[event.category])
      callback(event, sender, hub)
  }
}
