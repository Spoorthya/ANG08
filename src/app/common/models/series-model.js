'use strict';

angular.module('ang08.common')
  .service('SeriesModel', function ($http, UserModel, ENDPOINT_URI) {
    var service = this;

    function extract(result) {
      return result.data;
    }

    function getUrl() {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUser() + '/series.json';
    }

    function getUrlForId(seriesId) {
      return ENDPOINT_URI + 'users/' + UserModel.getCurrentUser() + '/series/' + seriesId + '.json';
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (seriesId) {
      return $http.get(getUrlForId(seriesId)).then(extract);
    };

    service.create = function (series) {
      return $http.post(getUrl(), series).then(extract);
    };

    service.update = function (seriesId, series) {
      return $http.put(getUrlForId(seriesId), series).then(extract);
    };

    service.destroy = function (seriesId) {
      return $http.delete(getUrlForId(seriesId)).then(extract);
    };
  });