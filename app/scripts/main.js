var myBlog = angular.module('myBlog',['ngRoute','firebase']);

myBlog.factory('donblogRefArray',['$firebaseArray',function($firebaseArray){
	var blogRef = new Firebase('https://donblog.firebaseio.com/blog');
	return $firebaseArray(blogRef);
}]);

myBlog.controller('homeController',['$scope','donblogRef',function($scope,donblogRefArray){
	$scope.blog = donblogRefArray;
 }]);

 //heyyy