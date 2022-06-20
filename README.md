# Game Loop Starter
This project builds upon the game loop basics project, focusing on the core components needed by 
many games. The goal of which is to have a simplified jump off for creating a game.

### Keyboard
For game input, the built-in javascript "keydown" and "keyup" event listeners, can be inadequate. Here are a few 
common difficulties you may run into when using them.
* Games often perform actions whilst a specific key is held down. For example, moving a character 
  forward while the 
  "w" or "up" key is held down. Since the event listeners are triggered only when the state of the 
  key changes, it is 
  your responsibility to keep track of the state of each key.
* The "keydown" event is often triggered periodically while the key is held down in some browsers.
* The event listeners are triggered outside the game loop's update code and provides no way of polling 
  for the state of a key.
* The event listeners don't allow for binding to specific keys. This forces the event handling 
  for all keys to take place in a single function.
* Likewise, they don't allow for event triggering for key combinations. 

**This keyboard implementation is designed to work around the above difficulties with two 
potentially important caveats.**
* Any work done inside the callbacks of registered keybindings can be called before, during, or 
  after the game loop's update and draw functions. This could allow the state or behaviour of 
  parts of your game to change part way through the update or draw functions of the game loop, 
  leading to unexpected behaviour.
* When relying on polling, a quick tap of a key may allow for the "keydown" and "keyup" events 
  to fire outside your code execution. Meaning, you would never know the key was tapped.

I am unsure how these problems would typically be solved (assuming they are even problems), but I 
believe both problems could be solved by implementing event queuing. In other words, real events 
would be queued up by the keyboard and played back synchronously during the update phase of the 
game loop.

Conceptually, these two caveat's could be a problem. However, I believe the time between frames 
is so small that they would not be a problem in practice.

**ToDo:**
* Implement event queueing?
* The length of time a key is held down should be tracked. (e.g. A "tap" vs a "long  press").
* Allow for multiple Keyboard Instances. I don't think I have ever used multiple keyboards in a 
  game before. I am not even sure if this is even common? Most keybindings associated with 
  gameplay need to be disabled when the menu screen is active. It seems to me as though it would 
  be convenient to have multiple keyboards with independent events for different parts of the game.

**It should also be noted this implementation does not work well with non-QWERTY keyboards. It
likely also doesn't work well with keyboards of different languages.**
