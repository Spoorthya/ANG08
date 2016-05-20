'use strict';

angular.module('ang08')
  .controller('NotesCtrl', function (currentUser, SeriesModel, NotesModel, $stateParams, $state) {
    var ctrl = this,
      seriesId = $stateParams.seriesId;

    ctrl.loading = false;

    ctrl.newNote = {
      title: '',
      content: ''
    };

    ctrl.goBack = function() {
      $state.go('seriesList');
    };

    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newNote = {
        title: '',
        content: ''
      };
    };

    ctrl.getSeries = function () {
      SeriesModel.fetch(seriesId)
        .then(function (series) {
          ctrl.series = series;
        }, function (reason) {
          //
        });
    };

    ctrl.getNotes = function () {
      NotesModel.all(seriesId)
        .then(function (notes) {
          ctrl.notes = (notes !== 'null') ? notes : {};
        }, function (reason) {
          //
        });
    };

    ctrl.createNote = function (note, isValid) {
      if (isValid) {
        ctrl.loading = true;

        NotesModel.create(seriesId, note)
          .then(function (result) {
            ctrl.getNotes();
          })
          .catch(function (reason) {
            //
          })
          .finally(function() {
            ctrl.resetForm();
          });
      }
    };

    ctrl.updateNote = function (noteId, note, isValid) {
      if (isValid) {
        ctrl.loading = true;

        NotesModel.update(seriesId, noteId, note)
          .then(function (result) {
            ctrl.getNotes();
          })
          .catch(function (reason) {
            //
          })
          .finally(function() {
            ctrl.resetForm();
          });
      }
    };

    ctrl.deleteNote = function (noteId) {
      NotesModel.destroy(seriesId, noteId)
        .then(function (result) {
          ctrl.getNotes();
        })
        .catch(function (reason) {
          //
        })
        .finally(function() {
          ctrl.cancelEditing();
        });
    };

    ctrl.setEditedNote = function(noteId, note) {
      ctrl.editedNoteId = noteId;
      ctrl.editedNote = angular.copy(note);
      ctrl.isEditing = true;
    };

    ctrl.isCurrentNote = function(noteId) {
      return ctrl.editedNote !== null && ctrl.editedNoteId === noteId;
    };

    ctrl.cancelEditing = function() {
      ctrl.loading = false;
      ctrl.editedNoteId = null;
      ctrl.editedNote = null;
      ctrl.isEditing = false;
    };

    ctrl.getSeries();
    ctrl.getNotes();
  });
