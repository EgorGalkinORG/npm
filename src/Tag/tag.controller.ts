import { Request, Response } from "express";
import { TagControllerContract } from "./tag.types";
import TagService from "./tag.service";

const TagController: TagControllerContract = {
  getAll: async (req: Request<object, any, object, { skip?: string; take?: string }>, res: Response<any>) => {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : undefined;
      const take = req.query.take ? Number(req.query.take) : undefined;

      if ((skip && isNaN(skip)) || (take && isNaN(take))) {
        res.status(400).json("skip and take must be numbers");
        return;
      }

      const tags = await TagService.getAll(skip, take);
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json("Unhandled error");
    }
  },

  getById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json("id must be a number");
        return;
      }

      const tag = await TagService.getById(id);
      if (!tag) {
        res.status(404).json("Tag not found");
        return;
      }

      res.status(200).json(tag);
    } catch (error) {
      res.status(500).json("Unhandled error");
    }
  },
};

export default TagController;
