angular.module("forms", ["ngResource"]).
  factory("Form", ['$resource', function($resource) {
    var Form;
    Form = $resource("/forms/:id", 
    { id: "@id" }, 
    {
      update: { method: "PUT" },
      destroy: { method: "DELETE" }
    });

    Form.prototype.destroy = function(cb) {
      return Form.remove({
        id: this.id
      }, cb);
    };

    return Form;
  }
]);
