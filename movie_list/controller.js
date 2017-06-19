(function(angular){
	var module = angular.module("movie_list_module",['ngRoute']);
	module.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/:type/:page/:query?",{
			"controller":"movie_list_controller",
			"templateUrl":"./movie_list/template.html"
		});
	}]);
	module.controller("movie_list_controller",["$cookies","$scope","$http","$routeParams","$route","$location","$rootScope",
		function($cookies,$scope,$http,$routeParams,$route,$location,$rootScope){
		var url = "https://api.douban.com/v2/movie/"+$routeParams.type;
		$scope.count = 2;
		$scope.loading = false;
		$scope.currentPage = parseInt($routeParams.page);
		$rootScope.urlType = $routeParams.type;
		// $scope.$apply("urlType");
		// console.log($scope.urlType);
		$scope.go = function(page){
			if(page>=1&&page<=$scope.totalPage)
			$route.updateParams({page:page});
		}
		
		$jsonp(url,{count:$scope.count,start:($scope.currentPage-1)*$scope.count,q:$routeParams.query},function cbFuncName(data){
			$scope.title = data.title;
			$scope.total = data.total;
			$scope.start = data.start;
			$scope.totalPage = Math.ceil($scope.total/$scope.count)
			$scope.loading = true;
			$scope.items = data.subjects;	
			// console.log(data);	
			$scope.$apply();	
		});
	}]);
})(angular);



