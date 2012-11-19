///<reference path="state.ts" />

// SimpleStateMachine example:   
var stateMachine = new State.SimpleStateMachine({
    rest:{
      enterState:function(){
        console.log("REST");
        $("#txtBox").val("at rest");
        $('#cmdDirty').hide();
        $('#cmdSave').hide();
        $('#cmdExit').hide();
        $('#cmdLogin').show();
      },
      loginButtonClick:function(data){
        stateMachine.transition("clean");
      }
    },
    clean: {
      enterState:function(){
        console.log("logging in ...");
        $("#txtBox").val("in clean state");
        $('#cmdLogin').hide();
        $('#cmdSave').show();
        $('#cmdExit').show();  
        $('#cmdDirty').show();      
      },
      dirtyButtonClick:function(data){
        stateMachine.transition("saving");
      },      
      exitButtonClick:function(){
        stateMachine.transition("rest");
      },
      exitState:function(){
        console.log("not logging in anymore");
      }
    },

    saving:{
      enterState:function(){
        $("#txtBox").val("saving ...");
        console.log("saving");
      },
      exitState:function(){
        console.log("not saving");
      },
      saveButtonClick:function(){
        stateMachine.transition("clean");
      },
    },

    logout:{
      enterState:function(
        ){
        $("#txtBox").val("log out state");
        console.log("logout");
      },
      exitState:function(){
        stateMachine.transition("rest");
      }   
    }
  }, "rest", this);


//bind events to DOM
$('#cmdLogin').click( function(e) {
    e.preventDefault();
    stateMachine.event("loginButtonClick",{ "username":"rhada","password":"pup","key":"foo" });
});
$('#cmdDirty').click( function(e) {
    e.preventDefault();
    stateMachine.event("dirtyButtonClick",{ "key":"data is now dirty" });
});
$('#cmdSave').click( function(e) {
    e.preventDefault();
    stateMachine.event("saveButtonClick",{ "akey":"bar" });
});
$('#cmdExit').click( function(e) {
    e.preventDefault();
    stateMachine.event("exitButtonClick",{ "username":"rhada","key":"LOGOUT_KEY" });
});
