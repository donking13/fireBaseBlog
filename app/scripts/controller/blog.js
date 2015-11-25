'use strict';


var blogCtrl = function($scope,donblogRefArray,$routeParams,$filter,$location,Auth){
	$scope.authObj = Auth;
	$scope.blog = donblogRefArray;
	$scope.postId = $routeParams;
	console.log($scope);
	console.log($routeParams);

	$scope.editPost = function(post){
		$location.path('/addPost/'+post.$id);
		console.log(post.$id);
	}

	$scope.deletePost = function(post){
		$scope.blog.$remove(post);
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

	$scope.authObj.$onAuth(function(authData){
		 if(authData) {$scope.logged = true;}
	});
}




module.exports = blogCtrl;