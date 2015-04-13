/**
 * Created by sbunke on 4/13/2015.
 */
angular.module('todoApp.controllers',[]).controller('TodoListController',['$scope','Todo','$ionicPopup',function($scope,Todo,$ionicPopup){

    Todo.getAll().success(function(data){
        $scope.items=data.results;
    });

    $scope.data = {
        showDelete: true
    };

    $scope.onItemDelete=function(item){
        $scope.showConfirm(item);
    }

    $scope.showConfirm = function(item) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                Todo.delete(item.objectId);
                $scope.items.splice($scope.items.indexOf(item),1);
                console.log('deleting');
            } else {
                console.log('not deleting');
            }
        });
    };


}]);

angular.module('todoApp.controllers').controller('TodoCreationController',['$scope','Todo','$state',function($scope,Todo,$state){

    $scope.todo={};

    $scope.create=function(){
        Todo.create({content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    }
}]);

angular.module('todoApp.controllers').controller('TodoEditController',['$scope','Todo','$state','$stateParams',function($scope,Todo,$state,$stateParams){

    $scope.todo={id:$stateParams.id,content:$stateParams.content};

    $scope.edit=function(){
        Todo.edit($scope.todo.id,{content:$scope.todo.content}).success(function(data){
            $state.go('todos');
        });
    }

}]);