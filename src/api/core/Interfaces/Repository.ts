import { TIRepository } from "../Types/Repository";

export interface IRepository<T, IR extends TIRepository<T>, L> {
  getMany<I extends IR["GetMany"]>(payload: I): Promise<L>;
  count<O extends number>(): Promise<O>;
  getByIds<I extends IR["GetByIds"]>(payload: I): Promise<T[]>;
  getById<I extends IR["GetById"]>(payload: I): Promise<T>;
  getOne<I extends IR["GetOne"]>(payload: I): Promise<T>;
  create<I extends IR["Create"]>(payload: I): Promise<I>;
  createMany<I extends IR["CreateMany"]>(payload: I[] | I): Promise<I[]>;
  updateOne<I extends IR["UpdateOne"]>(payload: I): Promise<T>;
  updateMany<I extends IR["UpdateMany"]>(payload: I): Promise<T[]>;
  deleteOne<I extends IR["DeleteOne"]>(payload: I): Promise<T>;
  deleteMultiple<I extends IR["DeleteMany"]>(payload: I): Promise<T[]>;
}
