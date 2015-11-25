'use strict';

var addPostCtrl = function($scope,donblogRefArray,$filter,Auth,$location,$routeParams){
	$scope.authObj = Auth;
	$scope.data = donblogRefArray;
	$scope.pageId = $routeParams;
	console.log($scope.pageId);

	$scope.addPost = function(){
		var timeStamp = Date.now(),
			postID = new Date().valueOf();

		timeStamp = $filter('date')(timeStamp, 'fullDate'); 
		$scope.data.$add({
			id:postID,
			time:timeStamp,
			title:$scope.title,
			body:$scope.blogBody
		});
		
		$scope.title = '';
		$scope.blogBody = '';
	}

	$scope.updatePost = function(){
		var ref = new Firebase('https://donblog.firebaseio.com/blog/');

		var timeStamp = Date.now(),
			postID = new Date().valueOf();

		timeStamp = $filter('date')(timeStamp, 'fullDate'); 

		ref.child($routeParams.id).set({
			id:postID,
			time:timeStamp,
			title:$scope.title,
			body:$scope.blogBody
		});
	}


	$scope.logout = function(){
		$scope.authObj.$unauth();
		$location.path('/');
		$scope.authObj.$onAuth(function(authData) {
		  if (authData) {
		    console.log("Logged in as------------:", authData.uid);
		  } else {
		    console.log("Logged out!!!");
		    $scope.logged = false;
		  }
		});
	}

	console.log($scope);
}

module.exports = addPostCtrl;