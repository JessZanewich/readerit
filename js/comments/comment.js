var Comments = angular.module("Comments", ["Users"]);

app.service("Comments", function($firebaseArray, $firebaseObject) {
	//accessing the posts array in firebase
	var ref = firebase.database().ref("posts/");
	var posts = $firebaseArray(ref);

	this.addComment = function(postId,comment, user) {
		//add a comment to the post with the specified $id
		var refComm = firebase.database().ref("posts/" + postId + "/comments/");
		var commArr = $firebaseArray(refComm);

		//$add() is an angularfire function to save new data to firebase
		commArr.$add({
			user: user.email,
			text: comment.text
		}).then(function(ref) {
			return ref;
		}, function(err) {
			console.log("Error", err);
		});
	}
});

app.controller("CommentController", function($scope, $firebaseArray, Comments, Users) {

	$scope.addComment = function(postId, comment) {
		//add comment to specific post

		var user = Users.userCheck(); //check if a user is logged in to allow commenting

		if(user) {
			$scope.commentWarn = false;//warning message to user to login turns off
			$scope.userVal = user;
			Comments.addComment(postId, comment, $scope.userVal); //call service to handle saving logic

			//clear values
			comment.user = "";
			comment.text = "";

		} else {
			$scope.commentWarn = true; //advise user to sign in to comment
		}
	}

});