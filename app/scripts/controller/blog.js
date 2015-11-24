'use strict';


var blogCtrl = function($scope,donblogRefArray){
	$scope.blog = donblogRefArray;
	console.log($scope);
}

module.exports = blogCtrl;