import { TList } from "../../../utils/types/type";

export type TIService<T> = {
  GetMany: object;
  GetOne: object;
  GetByIds: object;
  GetById: object;
  UpdateOne: object;
  DeleteOne: object;
  DeleteMany: object;
  Create: T;
};

type TDirection = "ASC" | "DESC";

type TGetMany = {
  page?: number;
  limit?: number;
  fields?: string[];
  filter?: object;
  sortBy?: string;
  orderBy?: TDirection;
  skip?: number;
  offset?: number;
};

type ValidateGetMany<O extends TGetMany> = O extends {
  page: number;
  limit: number;
  fields: string[];
  filter: object;
  sortBy: string;
  orderBy: TDirection;
  skip: number;
  offset: number;
}
  ? O
  : O extends {
      page: number;
      limit?: number;
      fields?: string[];
      filter?: object;
      sortBy?: string;
      orderBy?: TDirection;
      skip?: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit: number;
      fields?: string[];
      filter?: object;
      sortBy?: string;
      orderBy?: TDirection;
      skip?: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit?: number;
      fields: string[];
      filter?: object;
      sortBy?: string;
      orderBy?: TDirection;
      skip?: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit?: number;
      fields?: string[];
      filter: object;
      sortBy?: string;
      orderBy?: TDirection;
      skip?: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit?: number;
      fields?: string[];
      filter?: object;
      sortBy: string;
      orderBy?: TDirection;
      skip?: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit?: number;
      fields?: string[];
      filter?: object;
      sortBy: string;
      orderBy: TDirection;
      skip?: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit?: number;
      fields?: string[];
      filter?: object;
      sortBy: string;
      orderBy?: TDirection;
      skip: number;
      offset?: number;
    }
  ? O
  : O extends {
      page?: number;
      limit?: number;
      fields?: string[];
      filter?: object;
      sortBy: string;
      orderBy: TDirection;
      skip?: number;
      offset: number;
    }
  ? O
  : O;

type TGetOne = {
  clauses: object;
  fields?: string[];
  relationships?: string[];
};

type ValidateGetOne<O extends TGetOne> = O extends {
  clauses: object;
  fields: string[];
  relationships: string[];
}
  ? O
  : O extends {
      clauses: object;
      fields?: string[];
      relationships?: string[];
    }
  ? O
  : O extends {
      clauses?: object;
      fields: string[];
      relationships?: string[];
    }
  ? O
  : O extends {
      clauses?: object;
      fields?: string[];
      relationships: string[];
    }
  ? O
  : never;

type TGetById = {
  id: number;
  fields?: string[];
  relationships?: string[];
};

type ValidateGeById<O extends TGetById> = O extends {
  id: number;
  fields: string[];
  relationships: string[];
}
  ? O
  : O extends {
      id: number;
      fields?: string[];
      relationships?: string[];
    }
  ? O
  : O extends {
      id?: number;
      fields: string[];
      relationships?: string[];
    }
  ? O
  : O extends {
      id?: number;
      fields?: string[];
      relationships: string[];
    }
  ? O
  : never;

type TGetByIds = {
  ids: number[];
  fields?: string[];
  relationships?: string[];
};

type ValidateGeByIds<O extends TGetByIds> = O extends {
  ids: number[];
  fields: string[];
  relationships: string[];
}
  ? O
  : O extends {
      ids: number[];
      fields?: string[];
      relationships?: string[];
    }
  ? O
  : O extends {
      ids?: number[];
      fields: string[];
      relationships?: string[];
    }
  ? O
  : O extends {
      ids?: number[];
      fields?: string[];
      relationships: string[];
    }
  ? O
  : never;

type TUpdateOne = {
  data: object;
  clauses: Object;
};

type ValidateUpdateOne<O extends TUpdateOne> = O extends {
  data: object;
  clauses: object;
}
  ? O
  : never;

type TDeleteOne = {
  id: number;
};

type ValidateDeleteOne<O extends TDeleteOne> = O extends {
  id: number;
}
  ? O
  : never;

type TDeleteMany = {
  ids: number[];
};

type ValidateDeleteMany<O extends TDeleteMany> = O extends {
  ids: number[];
}
  ? O
  : never;

export type TServiceParameter<T> = {
  GetMany: ValidateGetMany<TGetMany>;
  GetOne: ValidateGetOne<TGetOne>;
  GetByIds: ValidateGeByIds<TGetByIds>;
  GetById: ValidateGeById<TGetById>;
  UpdateOne: ValidateUpdateOne<TUpdateOne>;
  DeleteOne: ValidateDeleteOne<TDeleteOne>;
  DeleteMany: ValidateDeleteMany<TDeleteMany>;
  Create: T;
};

// Input repository

type TInputGetManyRepository = {
  page?: number;
  limit?: number;
  fields?: string[];
  filter?: object;
  sortBy?: string;
  orderBy?: TDirection;
  text?: string;
  skip?: number;
  offset?: number;
};

type TInputGetByIdsRepository = {
  ids: number[];
  relationships?: string[];
  fields?: string[];
};

type TInputGetByIdRepository = {
  id: number;
  fields?: string[];
  relationships?: string[];
};

type TInputGetOneRepository = {
  clauses: object;
  fields?: string[];
  relationships?: string[];
};

type IInputUpdateOneRepository = { payload: object; clauses: object };

export {
  TInputGetManyRepository,
  TInputGetByIdsRepository,
  TInputGetByIdRepository,
  TInputGetOneRepository,
  IInputUpdateOneRepository,
};
