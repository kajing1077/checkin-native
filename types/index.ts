export type GameName = "genshin" | "honkai" | "starrail" | "zenless";

export interface ErrorResponse {
  message: string;
  code?: number;
}

export type Result<T, E> =
  | { type: "success"; value: T }
  | { type: "error"; error: E };

export interface ConfigEntry {
  config: GameConfig;
}

export interface SignResult {
  success: true;
}

export type ConfigType = Record<GameName, ConfigEntry>;

export interface Award {
  name: string;
  cnt: number;
  icon: string;
}

export interface AwardsResponse {
  retcode: number;
  data: {
    awards: Award[];
  };
}

export interface AccountData {
  game_role_id: string;
  nickname: string;
  level: number;
  region: string;
  game_id: number;
}

export interface GameConfig {
  ACT_ID: string;
  successMessage: string;
  signedMessage: string;
  game: GameName;
  game_id: number;
  assets: {
    author: string;
    game: string;
    icon: string;
  };
  url: {
    info: string;
    home: string;
    sign: string;
  };
}

export interface SuccessResponse {
  platform: GameName;
  total: number;
  result: string;
  assets: {
    author: string;
    game: string;
    icon: string;
  };
  account: {
    uid: string;
    nickname: string;
    rank: number;
    region: string;
    cookie: string;
  };
  award: Award;
}

export interface SignInfoData {
  total: number;
  today: string;
  isSigned: boolean;
}

export interface SignInfoResponse {
  success: boolean;
  data?: SignInfoData;
}

export type RewardData = {
  isSign: boolean;
  todayAward: {
    cnt: number;
    icon: string;
    name: string;
  };
};
