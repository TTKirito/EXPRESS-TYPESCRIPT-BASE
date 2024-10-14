import { OTP_KEY, ROLE } from "../../constants/common";
import errors from "../../constants/errors";
import { User } from "../../database/models/user";
import BadRequestError from "../../exceptions/badRequestError";
import NotFoundError from "../../exceptions/notFoundError";
import BcryptUtils from "../../services/Bcrypt";
import Jwt from "../../services/Jwt";
import RedisProvider from "../../services/Redis";
import { Helper } from "../../utils/Helper";
import { GENERATE_STRING_ENUM } from "../../utils/types/enum";
import Service from "../core/Service";
import RoleRepository from "../role/repository";
import TokenRepository from "../token/repository";
import UserRoleRepository from "../userRole/repository";
import AuthRepository from "./repository";
import { IAuthService } from "./types/interface/service";
import { TToken } from "./types/type/controller";
import { TInputAuthService } from "./types/type/service";

export default class AuthService
  extends Service<Partial<User>>
  implements IAuthService<TInputAuthService>
{
  static instance: AuthService;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  protected bcrypt: BcryptUtils;
  protected hepler: Helper;
  protected jwt: Jwt;
  protected redis: RedisProvider;
  protected repository = AuthRepository.getInstance();
  protected tokenRepository: TokenRepository;
  protected roleRepository: RoleRepository;
  protected userRoleRepository: UserRoleRepository;

  constructor() {
    super();
    this.hepler = Helper.getInstance();
    this.redis = RedisProvider.getInstance();
    this.jwt = Jwt.getInstance();
    this.tokenRepository = TokenRepository.getInstance();
    this.bcrypt = BcryptUtils.getInstance();
    this.roleRepository = RoleRepository.getInstance();
    this.userRoleRepository = UserRoleRepository.getInstance();
  }

  async login<I extends { email: string; password: string }>({
    email,
    password,
  }: I): Promise<TToken> {
    let existedUser = await this.repository
      .getOne({
        clauses: { email },
        fields: [],
        relationships: ["roles"],
      })
      .then((res) => JSON.parse(JSON.stringify(res)));

    if (!existedUser) {
      throw new BadRequestError(errors.INVALID_EMAIL_PASSWORD);
    }

    const isPass = this.bcrypt.compareSync({
      password,
      hash: String(existedUser.hash),
    });

    if (!isPass) {
      throw new BadRequestError(errors.INVALID_EMAIL_PASSWORD);
    }

    const token = this.jwt.issue({
      payload: existedUser,
      expires: Number(process.env.JWT_EXPIRES),
    });

    const refreshToken = this.jwt.issue({
      payload: existedUser,
      expires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES),
    });

    const existedToken = await this.tokenRepository.getOne({
      clauses: { user_id: existedUser.id },
      fields: ["id"],
    });

    if (!existedToken) {
      this.tokenRepository.create({
        user_id: existedUser.id,
        refresh_token: refreshToken,
      });
    } else {
      await this.tokenRepository.updateOne({
        clauses: { id: existedToken.id },
        payload: { refresh_token: refreshToken },
      });
    }

    delete existedUser.hash;
    return { token, refresh_token: refreshToken, user: existedUser };
  }

  async loginWithPhone<I extends { phone: string }>({
    phone,
  }: I): Promise<Boolean> {
    let existedUser = await this.repository.getOne({
      clauses: { phone },
      fields: ["id"],
      relationships: ["roles"],
    });

    if (!existedUser) {
      const role = await this.roleRepository.getOne({
        clauses: { name: ROLE.USER },
      });
      existedUser = await this.repository.create({ phone });
      await this.userRoleRepository.create({
        user_id: existedUser.id,
        role_id: role.id,
      });
    }

    const { token } = this.hepler.generateRandStr({
      length: 5,
      type: GENERATE_STRING_ENUM.NUMERIC,
    });

    console.log({ token });

    const key = `${OTP_KEY}:${existedUser.id}`;
    this.redis.save({ key, value: { otp: token }, expires: 60 });
    return true;
  }

  async refreshToken<I extends { refreshToken: string }>({
    refreshToken,
  }: I): Promise<TToken> {
    const token = await this.tokenRepository
      .getOne({
        clauses: { refresh_token: refreshToken },
        fields: ["id"],
        relationships: ["user", "user.roles"],
      })
      .then((res) => JSON.parse(JSON.stringify(res)));

    let newRefreshToken: string = "";
    let newtoken: string = "";

    if (!token) {
      throw new BadRequestError(errors.INVALID_REFRESH_TOKEN);
    }

    if (token.user) {
      newRefreshToken = this.jwt.issue({
        payload: token.user,
        expires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES),
      });
      await this.tokenRepository.updateOne({
        clauses: { id: token.id },
        payload: { refresh_token: newRefreshToken },
      });
      newtoken = this.jwt.issue({
        payload: token.user,
        expires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES),
      });
    }

    return {
      token: newtoken,
      refresh_token: newRefreshToken,
      user: token.user
    };
  }

  async verifyPhoneOTP<I extends { phone: string }>({
    phone,
  }: I): Promise<TToken> {
    let existedUser = await this.repository
      .getOne({
        clauses: { phone },
        fields: [],
        relationships: ["roles"],
      })
      .then((res) => JSON.parse(JSON.stringify(res)));

    if (!existedUser) {
      throw new NotFoundError();
    }

    const key = `${OTP_KEY}:${existedUser.id}`;
    const getKey = this.redis.getKey({ key });

    if (!getKey) {
      throw new BadRequestError(errors.VALID_OTP_CODE);
    }

    const token = this.jwt.issue({
      payload: existedUser,
      expires: Number(process.env.JWT_EXPIRES),
    });

    const refreshToken = this.jwt.issue({
      payload: existedUser,
      expires: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES),
    });

    const existedToken = await this.tokenRepository.getOne({
      clauses: { user_id: existedUser.id },
      fields: ["id"],
    });

    if (!existedToken) {
      this.tokenRepository.create({
        user_id: existedUser.id,
        refresh_token: refreshToken,
      });
    } else {
      await this.tokenRepository.updateOne({
        clauses: { id: existedToken.id },
        payload: { refresh_token: refreshToken },
      });
    }

    return { token, refresh_token: refreshToken, user: existedUser };
  }
}
