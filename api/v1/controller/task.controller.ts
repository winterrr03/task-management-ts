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
};

// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
};

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;

    await Task.updateOne({
      _id: id
    }, {
      status: status
    });

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    }); 
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại bản ghi!"
    });
  }
};

// [PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response): Promise<void> => {
  const { ids, status } = req.body;

  const listStatus: string[] = ["initial", "doing", "finish", "pending", "notFinish"];

  if (listStatus.includes(status)) {
    await Task.updateMany({
      _id: { $in: ids }
    }, {
      status: status
    });

    res.json({
      code: 200,
      message: "Đổi trạng thái thành công!"
    });
  } else {
    res.json({
      code: 400,
      message: `Trạng thái ${status} không hợp lệ!`
    });
  }
};

// [POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response): Promise<void> => {
  const task = new Task(req.body);
  await task.save();

  res.json({
    code: 200,
    message: "Tạo công việc thành công!"
  });
};

// [PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
  const data = req.body;

  await Task.updateOne({
    _id: id
  }, data);

  res.json({
    code: 200,
    message: "Cập nhật công việc thành công!"
  });
};

// [DELETE] /api/v1/tasks/delete/:id
export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  await Task.updateOne({
    _id: id
  }, {
    deleted: true,
    deletedAt: new Date()
  });

  res.json({
    code: 200,
    message: "Xóa công việc thành công!"
  });
};

// [PATCH] /api/v1/tasks/delete-multi
export const deleteMulti = async (req: Request, res: Response): Promise<void> => {
  const { ids } = req.body;

  await Task.updateMany({
    _id: { $in: ids }
  }, {
    deleted: true,
    deletedAt: new Date()
  });

  res.json({
    code: 200,
    message: "Xóa các công việc thành công!"
  });
};