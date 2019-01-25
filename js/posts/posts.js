var Posts = angular.module("Posts", ["Users"]);

app.service('Posts', function($firebaseArray, $firebaseObject) {
	//reference to post array in database
	var ref = firebase.database().ref("posts/");
	var posts = $firebaseArray(ref);

	this.addPost = function(post) {
		//$add() is a function from AngularFire, returns a promise if data is saved to the server
		posts
			.$add({
				title: post.title,
				url: post.url,
				upvotes: post.upvotes
			})
			.then(function(ref) {
				return ref;
			}, function(err) {
				console.log("Error", err);
		});
	}

	this.votePost = function(post, postId) {
		//function for saving the new value of upvotes to the specified post

		//reference to current post in database
		var ref = firebase.database().ref("posts/" + postId);
		var obj = $firebaseObject(ref);

		//$save() requires re-assignment of variables or it removes fields from DB
		obj.title 	= post.title;
		obj.url 		= post.url;
		obj.upvotes = post.upvotes++;
		
		//$save() is an angularfire method that updates a firebase object in the DB
		obj
			.$save()
			.then(function(ref) {
				return $firebaseObject(ref);
			}, function(err) {
				console.log("Error", err);
			});
	}
});

app.controller('PostsController', function($scope, $firebaseArray, Posts, Users) {
	//reference to posts array in database
	var ref 		 = firebase.database().ref("posts/");
	$scope.posts = $firebaseArray(ref);

	$scope.addPost = function(post) {
		var user = Users.userCheck(); //check if a user is logged in to allow posting

		if(user) {
			post.upvotes 			 = 0;
			$scope.doPost 		 = false;
			$scope.postWarning = false;
			$scope.voteWarn 	 = false;
			$scope.post  			 = Posts.addPost(post); //call service to handle logic

			//clear values
			post.title = "";
			post.url 	 = "";

		} else {
			$scope.postWarning = true;
		}
	}

	$scope.upvotePost = function(post, postId) {
		//a simple function for adding upvotes to the specified post

		var user = Users.userCheck();//check if a user is logged in to allow voting

		if(user) {
			$scope.voteWarn = false;//get rid of user must be logged in message
			Posts.votePost(post, postId); //call service to handle logic
		} else {
			$scope.voteWarn = true;
		}
	}

});