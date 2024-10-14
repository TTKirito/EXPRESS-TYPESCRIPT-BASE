import { BaseModel } from "../../database/models/BaseModel";
import NotFoundError from "../../exceptions/notFoundError";
import { TList } from "../../utils/types/type";
import { IService } from "./Interfaces/Service";
import Repository from "./Repository";
import {
  TInputGetByIdsRepository,
  TInputGetManyRepository,
  TInputGetByIdRepository,
  TInputGetOneRepository,
  IInputUpdateOneRepository,
  TServiceParameter,
} from "./Types/Service";

export default abstract class Service<T>
  implements IService<T, TServiceParameter<T>, TList>
{
  protected repository: Repository<T>;

  async create<I extends T>(payload: I): Promise<I> {
    return this.repository.create<I>(payload);
  }

  async deleteMultiple<I extends { ids: number[] }>({ ids }: I): Promise<T[]> {
    return this.repository.deleteMultiple({ ids });
  }

  async deleteOne<I extends { id: number }>({ id }: I): Promise<T> {
    return this.repository.deleteOne<{ id: number }>({ id });
  }

  async getById<
    I extends {
      id: number;
      fields?: string[] | undefined;
      relationships?: string[] | undefined;
    }
  >(payload: I): Promise<T> {
    const { id = 1, fields, relationships } = payload;
    const result = await this.repository.getById<TInputGetByIdRepository>({
      id,
      fields,
      relationships,
    });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  async getByIds<
    I extends {
      ids: number[];
      fields?: string[] | undefined;
      relationships?: string[] | undefined;
    }
  >(payload: I): Promise<T[]> {
    const { ids, fields, relationships } = payload;
    return this.repository.getByIds<TInputGetByIdsRepository>({
      ids,
      relationships,
      fields,
    });
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
    const { page, limit, fields, filter, sortBy, orderBy, skip, offset } = payload;
    return this.repository.getMany<TInputGetManyRepository>({
      page,
      limit,
      fields,
      filter,
      sortBy,
      orderBy,
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
    const { clauses = {}, fields, relationships } = payload;
    const result = await this.repository.getOne<TInputGetOneRepository>({
      clauses,
      fields,
      relationships,
    });
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }

  async updateOne<I extends { data: object; clauses: Object }>(
    payload: I
  ): Promise<T> {
    const result = await this.repository.updateOne<IInputUpdateOneRepository>({
      payload: payload.data,
      clauses: payload.clauses,
    });

    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }
}
