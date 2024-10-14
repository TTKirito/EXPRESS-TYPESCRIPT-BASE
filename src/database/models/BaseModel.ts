import { BaseEntity, Like } from "typeorm";
import { TParameterRepository } from "../../api/core/Types/Repository";

import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE,
  DEFAULT_SORT_BY,
} from "../../constants/common";
import { TList } from "../../utils/types/type";

export class BaseModel extends BaseEntity {
  public static async queryBuilder<T extends TParameterRepository<T>>({
    orderBy = DEFAULT_ORDER_BY,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sortBy = DEFAULT_SORT_BY,
    fields = [],
    filter = {},
    skip = 0,
    offset = 0,
  }: T["GetMany"]): Promise<TList> {
    skip = skip > 0 ? skip : Math.max(0, (page - 1) * limit);
    const conditions: object[] = [];
    Object.entries(filter).forEach(([key, value], index) => {
      let condition = {};
      condition[key] = Like(`%${value}%`);
      conditions.push(condition);
    });

    const query = {
      where: conditions,
      order: { [sortBy]: orderBy },
      skip: skip,
      take: offset > 0 ? offset : limit,
    };

    if (fields.length) {
      query["select"] = fields;
    }

    const [rows, total] = await this.findAndCount(query);
    const meta = { total, count: rows.length };
    return { meta, rows };
  }
}
