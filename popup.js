document.getElementById("send").addEventListener("click", () => {
	const message = document.getElementById("secret").value.trim();
	const response = document.getElementById("response");
	if(!message) {
		response.innerHTML = "<span class='error'><strong>Input Error:</strong> Fire Message cannot be empty!</span>";
		return;
	}
	fetch("https://firemsg.cc", {
		method:"POST",
		headers:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		body:"secret="+encodeURIComponent(message)+"&json=true"
	})
	.then(r => r.json())
	.then(d => {
		if(d.url) {
			navigator.clipboard.writeText(d.url);
			response.innerHTML = "<span class='success'><strong>Copied to Clipboard:</strong><br><a href='"+d.url+"' target='_blank'>"+d.url+"</a></span>";
		}
		else {
			response.innerHTML = "<span class='error'><strong>API Error:</strong> Error creating Fire Message. Try again.</span>";
		}
	})
	.catch(() => {
		response.innerHTML = "<span class='error'><strong>Network Error:</strong> Check your internet or try again.</span>";
	});
});