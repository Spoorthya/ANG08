'use strict';

angular.module('ang08.common')
  .service('NotesModel', function ($http, $q, UserModel, ENDPOINT_URI) {
    var service = this;

    function extract(result) {
      return result.data;
    }

    function getUrl(seriesId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUser() + '/series/' + seriesId + '/notes.json';
    }

    function getUrlForId(seriesId, noteId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUser() + '/series/' + seriesId + '/notes/' + noteId + '.json'
    }

    service.all = function (seriesId) {
      return $http.get(getUrl(seriesId)).then(extract);
    };

    service.fetch = function (seriesId, noteId) {
      return $http.get(getUrlForId(seriesId, noteId)).then(extract);
    };

    service.create = function (seriesId, note) {
      return $http.post(getUrl(seriesId), note).then(extract);
    };

    service.update = function (seriesId, noteId, note) {
      return $http.put(getUrlForId(seriesId, noteId), note).then(extract);
    };

    service.destroy = function (seriesId, noteId) {
      return $http.delete(getUrlForId(seriesId, noteId)).then(extract);
    };
  });