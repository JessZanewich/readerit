var app = angular.module('reader-it', ['ngRoute', 'firebase']);

//this API key is for the purpose of this DEMO application only
//and only because it is in a private repo

//firebase initialization
var config = {
	apiKey: "AIzaSyC2giumUah664EN2u4VUfSeugOz17JR14o",
	authDomain: "readerit-d4519.firebaseapp.com",
	databaseURL: "https://readerit-d4519.firebaseio.com",
	storageBucket: "readerit-d4519.appspot.com",
	messagingSenderId: "591806333411"
};

firebase.initializeApp(config);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'main.html'
		})
		.otherwise({
			redirectTo: '/'
		})
});


