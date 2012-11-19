//state.ts derived from TypeScript/../state.js
///<reference path="jquery.d.ts" />
module State {
  export class SimpleStateMachine {
  
  private _handlers : any;
  private _context : any;
  private _node : any;
  public _currentState: any;

  constructor(handlers, startState, _context, _node){
    this._handlers = handlers;
    this._context = _context;
    this._node = _node;
    this.transition(startState);  
  }

  public event (eventName :string, _eventData: any) : void {
    console.log("event "+eventName);
    if (_eventData.hasOwnProperty("key")) {
      console.log("_eventData.key: " + _eventData.key);
    }

    if (_eventData.hasOwnProperty("value")) {
      console.log("_eventData.value: " + _eventData.value);
    }
 
    var handler = this._getHandler(eventName);
    if(handler)
       handler.call(this._context, _eventData);
  }
  
  public transition (newState) {
  
  // exit previous state
  if(this._currentState) {
     console.log("exit state "+this._currentState);
  }
  
  var handler = this._getHandler("exitState");
  //call handler method where work will happen
  if(handler){ 
    handler.call(this._context);
  }
  
  // set state
  this._currentState = newState;

  // enter new state
  console.log("enter state "+ this._currentState);
  if(this._node){ 
    jQuery(this._node).addClass( this._currentState );
  }

  var handler = this._getHandler("enterState");
  if(handler) {
    handler.call(this._context);
  }
}

// return the current state handler for the event
// or if there isn't one and there is a base state handler
// defined, return the base state handler
public _getHandler (eventName)
{
    if(!this._currentState){ 
      return; 
    }
    var stateHandler = this._handlers[this._currentState];
    if(stateHandler && stateHandler[eventName]) {
      return stateHandler[eventName];
    }
    else { 
      if(this._handlers.base){ 
         return this._handlers.base[eventName];
      }
    }
  }
}

}