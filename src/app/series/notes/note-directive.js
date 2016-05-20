angular.module('ang08')
  .directive('note', function(NotesModel, $stateParams){
    var controller = function($scope) {
      var ctrl = this,
        seriesId = $stateParams.seriesId;

      console.log('ctrl', ctrl);
      
      ctrl.loading = false;

      ctrl.updateNote = function (noteId, note) {
        ctrl.loading = true;
        
        NotesModel.update(seriesId, noteId, note)
          .then(function (result) {
            //
          })
          .catch(function (reason) {
            //
          })
          .finally(function() {
            ctrl.loading = false;
          });
      };

      ctrl.deleteNote = function (noteId) {
        ctrl.remove({noteId:noteId});
      };
    };

    return {
      scope: {
        noteId: '@',
        note:'=',
        remove:'&'
      },
      templateUrl: 'app/series/notes/note.tmpl.html',
      controller: controller,
      controllerAs: 'ctrl',
      bindToController: true
    }
  })
;