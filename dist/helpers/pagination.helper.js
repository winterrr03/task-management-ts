"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paginationHelper = function (req, countRecords) {
    var objectPagination = {
        currentPage: 1,
        limitItems: 2
    };
    if (req.query.page) {
        objectPagination.currentPage = parseInt("".concat(req.query.page));
    }
    if (req.query.limit) {
        objectPagination.limitItems = parseInt("".concat(req.query.limit));
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitItems);
    return objectPagination;
};
exports.default = paginationHelper;
