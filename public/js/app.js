const calendarrequestModal = document.querySelector('.cal-new-request');
const documentsrequestModal = document.querySelector('.doc-new-request');
const calendarrequestLink = document.querySelector('.cal-add-request');
const documentsrequestLink = document.querySelector('.doc-add-request');
const db = firebase.firestore();
//Get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

// open Calendar request modal
calendarrequestLink.addEventListener('click', () => {
  calendarrequestModal.classList.add('open');
});

// open Documents request modal
documentsrequestLink.addEventListener('click', () => {
  documentsrequestModal.classList.add('open');
});

// close Calendar request modal
calendarrequestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('cal-new-request')) {
    calendarrequestModal.classList.remove('open');
  }
});

// close Documents request modal
documentsrequestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('doc-new-request')) {
    documentsrequestModal.classList.remove('open');
  }
});

//Listen for file selection
fileButton.addEventListener('change', function(e) {
  //Get file
  var file = e.target.files[0];

  //Create a storage ref
  var storageRef = firebase.storage().ref('medical_document/'+ file.name);

  // Upload file
  var task = storageRef.put(file);

  // Update progress bar
  task.on('state_changed', 
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred /
      snapshot.totalBytes) * 100;
      uploader.value = percentage;

    },

    function error(err) {

    },

    function complete() {

    }

    );

});
 
