import { Octokit } from "/@octokit/rest.js";
var octokit;
window.windowAuth = function(callback, param) {
	var popup = window.open("https://github.com/login/oauth/authorize?client_id=7415eb3be51e7222a91c&scope=repo", "", "width=960,height=540");
	window.addEventListener("message", (event) => {
		var checkloc = event.data.indexOf("=");
		var check = event.data.slice(0, checkloc + 1);
		if ("idbfwhbwaidhglhjgllbrhwvurjkghdahsjgufhvbawufghksjhdgauysfbvqywurbvquywbvuwqdv=" !== check) {
			return 0;
		}
		var url = event.data;
		url = url.toString();
		var codelocation = url.indexOf("=");
		var code = url.slice(codelocation + 1);
		popup.close()
		var ghendpoint = 'https://github.com/login/oauth/access_token?client_id=7415eb3be51e7222a91c&client_secret=f43a1da2796648bb8f8d98a166ff3278d7843624&code=' + code;
		$.get("https://keep-header-proxy.herokuapp.com/" + ghendpoint, function (access_token) {
			var token_loc_start = access_token.indexOf("=");
			var token_loc_end = access_token.indexOf("&");
			var token = access_token.slice(token_loc_start + 1, token_loc_end);
			octokit = new Octokit({
				auth: token
			});
			if (callback) {
				callback(param)
			}
		});
	}, false);
}
window.sendNewData = async function(new_content) {
	if (octokit) {
		var contents = octokit.rest.repos.getContent({
			owner: 'lvoz2',
			repo: 'JS-Image-Recognition-Software',
			path: 'text.txt'
		})
		contents.then(
			function(value) {
				var blob = value.data.sha;
				var content = btoa(new_content);
				octokit.rest.repos.createOrUpdateFileContents({
					owner: 'lvoz2',
					repo: 'JS-Image-Recognition-Software',
					path: 'text.txt',
					message: 'Add new data',
					content: content,
					sha: blob
				});
			},
			function(error) {
				console.error(error);
			}
		);
	}
	else {
		windowAuth(sendNewData, new_content)
	}
}
window.test = function() {
	window.octokit = new Octokit({
		auth: code
	});
}
		 
