# Event-System-Javascript

A naive event system working made of three elements: event-hub, emitter and receiver.

See the console output of `example.html` and the code in `example.js` for full usage documentation.

## Example

```javascript
// Subscribe to a type of event and create a callback
listener.receiver.subscribeToEvent(hub, 'TYPE0', (event, sender, hub) => {
  console.info('Event Callback executing for category:', event.category)
  console.info('Payload received:', event.payload)
  console.info('From sender: ', sender)
  console.info('From hub: ', hub)
})

// Our talker emits an event
talker.emitter.emit(new Event('TYPE0', { hello: 'world' }))
```

![output of example.js](https://raw.githubusercontent.com/janderudder/Event-System-Javascript/master/example-output.jpg)
