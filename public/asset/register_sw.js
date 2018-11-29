(function(){
	if('serviceWorker'in navigator){
		console.log('service-worker supported in this browser');
	}else{
		console.log('service-worker not supported in this browser');
		return
	}
})();
(function(){
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('sw.js', {scope: '/'})
		.then ( () =>console.log('service worker register'))
		.catch( (error)=>console.log("register failed:",error));
	}
})();

// let deferredPrompt;
// const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI to notify the user they can add to home screen
//   addBtn.style.display = 'block';

//   addBtn.addEventListener('click', (e) => {
//     // hide our user interface that shows our A2HS button
//     addBtn.style.display = 'none';
//     // Show the prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the A2HS prompt');
//         } else {
//           console.log('User dismissed the A2HS prompt');
//         }
//         deferredPrompt = null;
//       });
//   });
// });