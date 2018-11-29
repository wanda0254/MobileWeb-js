var URL="data/catatan.txt";
fetch(URL)
	.then(function(response){
		if (response.status !== 200) { //HTTP Status
			console.log('Ada masalah. Status Code: ' +
		response.status);
	return;
}
	return response.text()
})
.then( text => console.log(text) )
.catch( err => console.log(err) );