'use strict';


var addPostCtrl = function($scope,donblogRefArray,$filter){
	$scope.data = donblogRefArray;
	

	$scope.addPost = function(){
		var timeStamp = Date.now();

		timeStamp = $filter('date')(timeStamp, 'fullDate'); 

		$scope.data.$add({
			time:timeStamp,
			title:$scope.title,
			body:$scope.blogBody
		});
		
		$scope.title = '';
		$scope.blogBody = '';
	}
	console.log($scope);
}

module.exports = addPostCtrl;