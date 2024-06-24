import { Request, Response } from "express";
import Task from "../models/task.model"
import paginationHelper from "../../../helpers/pagination.helper";

// [GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp
  }

  const find: Find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = `${req.query.status}`;
  }

  // Sắp xếp
  const sort: any = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[`${req.query.sortKey}`] = `${req.query.sortValue}`;
  }
  // Hết Sắp xếp

  // Tìm kiếm
  if (req.query.keyword) {
    const regex: RegExp = new RegExp(`${req.query.keyword}`, "i");
    find.title = regex;
  }
  // Hết Tìm kiếm

  // Phân trang
  const countTasks = await Task.countDocuments(find);
  const objectPagination = paginationHelper(req, countTasks);
  // Hết Phân trang

  const tasks = await Task
                .find(find)
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip)
                .sort(sort);

  res.json(tasks);
}

// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
}