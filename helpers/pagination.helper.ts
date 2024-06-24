import { Request } from "express";

interface Pagination {
  currentPage: number,
  limitItems: number,
  skip?: number,
  totalPage?: number
}

const paginationHelper = (req: Request, countRecords: number): Pagination => {
  const objectPagination: Pagination = {
    currentPage: 1,
    limitItems: 2
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(`${req.query.page}`);
  }

  if (req.query.limit) {
    objectPagination.limitItems = parseInt(`${req.query.limit}`);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  objectPagination.totalPage = Math.ceil(countRecords / objectPagination.limitItems);

  return objectPagination;
}

export default paginationHelper;