import { TIService } from "../Types/Service";

export interface IService<T, IS extends TIService<T>, L> {
  getMany<I extends IS['GetMany']>(payload: I ): Promise<L>;
  getByIds<I extends IS["GetByIds"]>(payload: I): Promise<T[]>;
  getById<I extends IS["GetById"]>(payload: I): Promise<T>;
  getOne<I extends IS["GetOne"]>(payload: I): Promise<T>;
  create<I extends T>(payload: I): Promise<I>;
  updateOne<I extends IS["UpdateOne"]>(payload: I): Promise<T>;
  deleteOne<I extends IS["DeleteOne"]>(payload: I): Promise<T>;
  deleteMultiple<I extends IS["DeleteMany"]>(payload: I): Promise<T[]>;
}
