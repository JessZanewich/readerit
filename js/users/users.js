var Users = angular.module("Users", []);

app.service("Users", function($firebaseArray, $firebaseObject, $firebaseAuth) {

	this.signup = function(user) {
		//firebase authentification service to add a user with an email and password
		firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
			.catch(function(error) {
  			var errorCode = error.code;
  			var errorMessage = error.message;
  	});
	}

	this.login = function(user) {
		//firebase authentification service to add check for a user
		firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  return false;
		});
	}

	this.logout = function(user) {
		//firebase authentification to log user out
		firebase.auth().signOut().then(function() {
		  return true;
		}, function(error) {
		});
	}

	this.userCheck = function(user) {
		//simple check to verify if there is a user currently signed in
		var user = firebase.auth().currentUser;
		return user;
	}
});

app.controller("UserController", function($scope, $firebaseArray, $firebaseObject, Users) {
	var ref 		 = firebase.database().ref("users/");
	$scope.users = $firebaseArray(ref);

	$scope.signup = function(user) {
		//assign values if a user signs up

		$scope.doSignup = false;//hide signup fields
		logInVars();

		Users.signup(user);

		user.email 		= "";
		user.password = "";
	}

	$scope.login = function(user) {
		//assign values after checking if a user is logged in

		var login = Users.login(user);
		if(login === undefined) {
			logInVars();
			$scope.doLogin = false;//hide login fields
			$scope.userVal = user;

			user.email 		= "";
			user.password = "";
		} else {
			$scope.doLogin = true;
			$scope.noLog = false;
		}

	}

	$scope.logout = function() {
		//logs user out 

		$scope.noLog = false;
		Users.logout();
	}

	$scope.userCheck = function() {
		//function for comments, posts and upvoting to check if a user is logged in
		var user = firebase.auth().currentUser;
		if(user) {
			$scope.warning = false;
			$scope.userVal = user;
		} else {
			$scope.doPost  = false;
			$scope.warning = true;
		}
	}

	function logInVars() {
		//assigning variables for newly signed or logged in users

		$scope.noLog	 		 = true;//hide signup and logic links
		$scope.postWarn 	 = false;//these are warning messages for features 
		$scope.voteWarn 	 = false;//that the user must be looged in to do
		$scope.commentWarn = false;
	}

});