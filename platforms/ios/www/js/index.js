let app = {
    init: function () {
      document.addEventListener("deviceready", app.ready);
    },
    ready: function () {
      app.addListeners();
    },
    addListeners: function () {
      document.querySelector("#add-btn").addEventListener("click", app.addNote);
      cordova.plugins.notification.local.on("click", function (notification) {
        navigator.notification.alert("clicked: " + notification.id);
        //user has clicked on the popped up notification
        console.log(notification.data);
      });
      cordova.plugins.notification.local.on("trigger", function (notification) {
        //added to the notification center on the date to trigger it.
        navigator.notification.alert("triggered: " + notification.id);
      });
    },
    addNote: function (ev) {
      let props = cordova.plugins.notification.local.getDefaults();
      //console.log(props);
      /**
       * Notification Object Properties - use it as a reference later on
       * id
       * text
       * title
       * every
       * at
       * data
       * sound
       * badge
       */
      let inOneMin = new Date();
      inOneMin.setMinutes(inOneMin.getMinutes() + 1);
      let id = new Date().getMilliseconds();
  
      let noteOptions = {
        id: id,
        title: "This is the Title",
        text: "Don't forget to do that thing.",
        at: inOneMin,
        badge: 1,
        data: {
          prop: "prop value",
          num: 42
        }
      };
  
      /**
       * if(props.icon){
        noteOptions.icon = './img/calendar-md-@2x.png'
      }
      if(props.led){
        noteOptions.led = '#33CC00'
      }
      if(props.actions){
        noteOptions.actions = [{ id: "yes", title: "Do it" }, { id: "no", title: "Nah" }]
      }
      **/
      cordova.plugins.notification.local.schedule(noteOptions, function(note){
        //this is the callback function for the schedule method
        //this runs AFTER the notification has been scheduled.
      });
  
      navigator.notification.alert("Added notification id " + id);
  
      cordova.plugins.notification.local.cancel(id, function () {
        // will get rid of notification id 1 if it has NOT been triggered or added to the notification center
        // cancelAll() will get rid of all of them
      });
      cordova.plugins.notification.local.clear(id, function () {
        // will dismiss a notification that has been triggered or added to notification center
      });
      cordova.plugins.notification.local.isPresent(id, function (present) {
        // navigator.notification.alert(present ? "present" : "not found");
        // can also call isTriggered() or isScheduled()
        // getAllIds(), getScheduledIds() and getTriggeredIds() will give you an array of ids
        // get(), getAll(), getScheduled() and getTriggered() will get the notification based on an id
      });
  
    }
  };
  app.init();

  