FormsIndexCtrl = function($scope, Form) {
    $scope.forms = Form.query();

    return $scope.destroy = function() {
        var original;
        if (confirm("Вы уверены?")) {
            original = this.form;
            return this.form.destroy(function() {
                return $scope.forms = _.without($scope.forms, original);
            });
        }
    };
};

FormsIndexCtrl.$inject = ['$scope', 'Form'];

FormsCreateCtrl = function($scope, $location, Form) {

    $scope.form = {view: '', title: '', fields: []};

    $scope.fields = [{title: '', tag: ''}];

    $scope.addField = function() {
        $scope.fields.push({title: '', tag: ''});
    };

    $scope.removeField = function(i){
        $scope.fields.splice(i, 1);
    };

    $scope.addTag = function(tag){
        $scope.form.view = $scope.form.view + tag;
    };

    return $scope.save = function() {
        $scope.form.fields = JSON.stringify($scope.fields);
        return Form.save($scope.form, function(form) {
            return $location.path("/forms/" + form.id + "/edit");
        });
    };
};

FormsCreateCtrl.$inject = ['$scope', '$location', 'Form'];

FormsShowCtrl = function($scope, $location, $routeParams, Form) {

    $scope.fields = [];
    $scope.newform = {};
    $scope.done = false;


    Form.get({
        id: $routeParams.id
    }, function(form) {
        this.original = form;
        $scope.fields = JSON.parse(form.fields);
        return $scope.form = new Form(this.original);
    });


    $scope.justDoIt = function(){
      angular.forEach($scope.newform, function(value, key){
          var re = new RegExp('<'+key+'>', 'g');
          $scope.form.view = $scope.form.view.replace(re, value);
      });
      $scope.done = true;
    };

    return $scope.destroy = function() {
        if (confirm("Вы уверены?")) {
            return $scope.form.destroy(function() {
                return $location.path("/forms");
            });
        }
    };
};

FormsShowCtrl.$inject = ['$scope', '$location', '$routeParams', 'Form'];

FormsEditCtrl = function($scope, $location, $routeParams, Form) {
    $scope.fields = [];
    Form.get({
        id: $routeParams.id
    }, function(form) {
        this.original = form;
        $scope.fields = JSON.parse(form.fields);
        return $scope.form = new Form(this.original);
    });

    $scope.addField = function() {
        $scope.fields.push({title: '', tag: ''});
    };

    $scope.removeField = function(i){
        $scope.fields.splice(i, 1);
    };

    $scope.addTag = function(tag){
        $scope.form.view = $scope.form.view + tag;
    };

    $scope.isClean = function() {
        return angular.equals(this.original, $scope.form);
    };
    $scope.destroy = function() {
        if (confirm("Вы уверены?")) {
            return $scope.form.destroy(function() {
                return $location.path("/forms");
            });
        }
    };
    return $scope.save = function() {
        return Form.update($scope.form, function(form) {
            return $location.path("/forms");
        });
    };
};

FormsEditCtrl.$inject = ['$scope', '$location', '$routeParams', 'Form'];


