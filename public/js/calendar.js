$(document).ready(function() {
	//************************************************************
	//		Modify API Key Restriction on console.developers.google.com/apis when site is live
	//************************************************************
	var api_key =  "AIzaSyB9jaxPsQvDxPfOn78vbcZLhDnvwblJveo";
	var calendar_id = "charlotte.canby@gmail.com"; 	
	var calendar_json_url = "https://calendar.google.com/calendar/embed?src=charlotte.canby%40gmail.com&gsessionid=OK"
	var client_id = "283648912352-h6a8qprcmogrqjjdmgg5lmctqgr18r44.apps.googleusercontent.com";
	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month'
		},
	    selectable: true,
		selectHelper: true,
		editable: true,
		//eventLimit: true,
      displayEventTime: false, // don't show the time column in list view

      ApiKey: api_key,

      // US Holidays
      events: calendar_id,


      loading: function(bool) {
        $('#loading').toggle(bool);
      }
		/*events: {
			googleCalendarApiKey: api_key,
			googleCalendarId: calendar_id,
            className: 'gcal-event',   // A CSS class (or array of classes) that will be attached to this event's element         
            currentTimezone: 'America/Los_Angeles' 
		}*/
		
		/*eventClick: function(calEvent, jsEvent, view) {

			alert('Event: ' + calEvent.title);
			alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			alert('View: ' + view.name);

			// change the border color just for fun
			$(this).css('border-color', 'red');
			
			return false;	// prevents page from reloading
		}*/
		
		
	});
});