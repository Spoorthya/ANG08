'use strict';

angular.module('ang08')
    .controller('SeriesCtrl', function (currentUser, SeriesModel) {
        var ctrl = this;

        ctrl.loading = false;

        ctrl.newSeries = {
            title: '',
            description: '',
            startDate: '',
            director: ''
        };

        ctrl.resetForm = function () {
            ctrl.loading = false;
            ctrl.newSeries = {
                title: '',
                description: '',
                startDate: '',
                director: ''
            };
        };

        ctrl.getSeriesList = function () {
            SeriesModel.all()
                .then(function (result) {
                    ctrl.seriesList = (result !== 'null') ? result : {};
                }, function () {
                    ctrl.resetForm();
                });
        };

        ctrl.createSeries = function (series, isValid) {
            if (isValid) {
                ctrl.loading = true;

                SeriesModel.create(series)
                    .then(function (result) {
                        ctrl.getSeriesList();
                    })
                    .catch(function (reason) {
                        //
                    })
                    .finally(function () {
                        ctrl.resetForm();
                    });
            }
        };

        ctrl.updateSeries = function (seriesId, series, isValid) {
            if (isValid) {
                ctrl.loading = true;
                SeriesModel.update(seriesId, series)
                    .then(function (result) {
                        ctrl.getSeriesList();
                    })
                    .catch(function (reason) {
                        //
                    })
                    .finally(function () {
                        ctrl.cancelEditing();
                    });
            }
        };

        ctrl.deleteSeries = function (seriesId) {
            SeriesModel.destroy(seriesId)
                .then(function (result) {
                    ctrl.getSeriesList();
                })
                .catch(function (reason) {
                    //
                })
                .finally(function () {
                    ctrl.cancelEditing();
                });
        };

        ctrl.setEditedSeries = function (seriesId, series) {
            ctrl.editedSeriesId = seriesId;
            ctrl.editedSeries = angular.copy(series);
            ctrl.isEditing = true;
        };

        ctrl.isCurrentSeries = function (seriesId) {
            return ctrl.editedSeries !== null && ctrl.editedSeriesId === seriesId;
        };

        ctrl.cancelEditing = function () {
            ctrl.loading = false;
            ctrl.editedSeriesId = null;
            ctrl.editedSeries = null;
            ctrl.isEditing = false;
        };

        ctrl.getSeriesList();
    })
    .directive('series', function(){

        var linker = function (scope, element, attr) {
            $(element).hover(
             function() {
                $( this ).children('.simple-series').css( 'opacity', '0.5' );
             }, function() {
                $( this ).children('.simple-series').css( 'opacity', '1.0' );
             }
            );
        };

        return {
            link: linker,
            templateUrl: 'app/series/series.tmpl.html'
        }
    });

