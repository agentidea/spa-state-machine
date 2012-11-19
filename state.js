/* 
 *

SimpleStateMachine
  example:

 // create it:
  stateMachine = new SimpleStateMachine({
    rest:{
      enterState:function(){
        trace("REST");
      },
      searchButtonClick:function(){
        stateMachine.transition("searching");
      },
    },
    searching:{
      enterState:function(){
        trace("SEARCHING");
      },
      exitState:function(){
        trace("not searching");
      },
      searchButtonClick:function(){
        stateMachine.transition("paused");
      },
      cancelButtonClick:function(){
        stateMachine.transition("rest");
      },
    },
    paused:{
      enterState:function(){
        trace("PAUSED");
      },
      searchButtonClick:function(){
        stateMachine.transition("searching");
      },
      cancelButtonClick:function(){
        stateMachine.transition("rest");
      },
    }
  }, "rest", this);

  // use it:
  stateMachine.event("searchButtonClick");
  stateMachine.event("cancelButtonClick");


  NOTE: you can add a "base" state to define default handlers for all states
  i.e.

  base:{
    enterState:function(){
      trace("base handler for all enterState events, can be overridden (or even extended)");
    },
    searchButton:function(){
      trace("base handler:searchButton");
    }
  }
*
*/

//----------------------------------------------------- 
function SimpleStateMachine(handlers, startState, _context, _node){
  this._handlers = handlers;
  this._context = _context;
  this._node = _node;
  this.transition(startState);
}
//----------------------------------------------------- 
SimpleStateMachine.prototype.event = function(eventName, _eventData){
  console.log("event "+eventName);
  _eventData && console.log("_eventData.key: " + _eventData.key);// + " _eventData.value: " + _eventData.value);
  var handler = this._getHandler(eventName);
  if(handler) handler.call(this._context, _eventData);
}
//----------------------------------------------------- 
SimpleStateMachine.prototype.transition = function(newState){
  // exit previous state
  if(this._currentState) console.log("exit state "+this._currentState);
  if(this._node) jQuery(this._node).removeClass( this._currentState );
  var handler = this._getHandler("exitState");
  if(handler) handler.call(this._context);
  // set state
  this._currentState = newState;
  // enter new state
  console.log("enter state "+this._currentState);
  if(this._node) jQuery(this._node).addClass( this._currentState );
  var handler = this._getHandler("enterState");
  if(handler) handler.call(this._context);
}
//----------------------------------------------------- 
// return the current state handler for the event
// or if there isn't one and there is a base state handler
// defined, return the base state handler
SimpleStateMachine.prototype._getHandler = function(eventName){
  if(!this._currentState) return;
  var stateHandler = this._handlers[this._currentState];
  if(stateHandler && stateHandler[eventName]) return stateHandler[eventName];
  else if(this._handlers.base) return this._handlers.base[eventName];
}

