import { In } from "typeorm";
import { TList } from "../../utils/types/type";
import { IRepository } from "./Interfaces/Repository";
import { TParameterRepository } from "./Types/Repository";

export default abstract class Repository<T>
  implements IRepository<T, TParameterRepository<T>, TList>
{
  public model: any;

  constructor(model: any) {
    this.model = model;
  }

  async count<O extends number>(): Promise<O> {
    return this.model.count();
  }

  async create<I extends T>(payload: I): Promise<I> {
    const result = await this.model.create(payload);
    return await result.save();
  }

  async createMany<I extends T[]>(payload: I | I[]): Promise<I[]> {
    return this.model.insert(payload);
  }

  async deleteMultiple<I extends { ids: number[] }>({ ids }: I): Promise<T[]> {
    if (Number(process.env.HAS_DELETED_AT) === 1) {
      return this.model.update({ id: In(ids) }, { delete_date: new Date() });
    }
    return this.model.delete(ids);
  }

  async deleteOne<I extends { id: number }>({ id }: I): Promise<T> {
    if (Number(process.env.HAS_DELETED_AT) === 1) {
      return this.model.update({ id }, { delete_date: new Date() });
    }
    return this.model.delete(id);
  }

  async getById<
    I extends {
      id: number;
      fields?: string[] | undefined;
      relationships?: string[] | undefined;
    }
  >(payload: I): Promise<T> {
    const { id, fields = [], relationships = [] } = payload;
    const conditon = { where: { id }, relations: relationships };

    if (fields.length) {
      conditon["select"] = fields;
    }
    return this.model.findOne(conditon);
  }

  async getByIds<
    I extends {
      ids: number[];
      fields?: string[] | undefined;
      relationships?: string[] | undefined;
    }
  >(payload: I): Promise<T[]> {
    const { ids, fields = [], relationships = [] } = payload;
    const conditon = { relations: relationships };

    if (fields.length) {
      conditon["select"] = fields;
    }

    return this.model.findByIds(ids, conditon) || [];
  }

  async getMany<
    I extends {
      page?: number | undefined;
      limit?: number | undefined;
      fields?: string[] | undefined;
      filter?: object | undefined;
      sortBy?: string | undefined;
      orderBy?: ("ASC" | "DESC") | undefined;
      skip?: number | undefined;
      offset?: number | undefined;
    }
  >(payload: I): Promise<TList> {
    const { orderBy, limit, page, sortBy, fields, filter, skip, offset } = payload;
    return await this.model.queryBuilder({
      orderBy,
      limit,
      page,
      sortBy,
      fields,
      filter,
      skip, 
      offset
    });
  }

  async getOne<
    I extends {
      clauses: object;
      fields?: string[] | undefined;
      relationships?: string[] | undefined;
    }
  >(payload: I): Promise<T> {
    const { clauses, fields = [], relationships = [] } = payload;
    const conditon = { where: clauses, relations: relationships };

    if (fields.length) {
      conditon["select"] = fields;
    }

    return this.model.findOne(conditon);
  }

  async updateMany<I extends { payload: object; fields: string[] }>({
    payload,
    fields,
  }: I): Promise<T[]> {
    return this.model.upsert(payload, fields);
  }

  async updateOne<I extends { payload: object; clauses: Object }>({
    clauses,
    payload,
  }: I): Promise<T> {
    return this.model.update(clauses, payload);
  }
}
