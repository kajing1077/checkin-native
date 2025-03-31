import { ConfigType, GameConfig, GameName } from "@/types";

export const DEFAULT_CONSTANTS: Record<GameName, GameConfig> = {
  genshin: {
    ACT_ID: "e202102251931481",
    successMessage: "오늘 보상을 잘 받았어! 여행자~",
    signedMessage: "여행자, 이미 출석 체크를 완료했어~",
    game: "genshin",
    game_id: 2,
    assets: {
      author: "Paimon",
      game: "Genshin Impact",
      icon: "https://fastcdn.hoyoverse.com/static-resource-v2/2024/04/12/b700cce2ac4c68a520b15cafa86a03f0_2812765778371293568.png",
    },
    url: {
      info: "https://sg-hk4e-api.hoyolab.com/event/sol/info",
      home: "https://sg-hk4e-api.hoyolab.com/event/sol/home",
      sign: "https://sg-hk4e-api.hoyolab.com/event/sol/sign",
    },
  },
  honkai: {
    ACT_ID: "e202110291205111",
    successMessage: "You have successfully checked in today, Captain~",
    signedMessage: "You've already checked in today, Captain~",
    game: "honkai",
    game_id: 1,
    assets: {
      author: "Kiana",
      game: "Honkai Impact 3rd",
      icon: "https://fastcdn.hoyoverse.com/static-resource-v2/2024/02/29/3d96534fd7a35a725f7884e6137346d1_3942255444511793944.png",
    },
    url: {
      info: "https://sg-public-api.hoyolab.com/event/mani/info",
      home: "https://sg-public-api.hoyolab.com/event/mani/home",
      sign: "https://sg-public-api.hoyolab.com/event/mani/sign",
    },
  },
  starrail: {
    ACT_ID: "e202303301540311",
    successMessage: "오늘 보상을 잘 받았어! 개척자!",
    signedMessage: "개척자님, 이미 출석 체크를 완료했습니다~",
    game: "starrail",
    game_id: 6,
    assets: {
      author: "PomPom",
      game: "Honkai: Star Rail",
      icon: "https://fastcdn.hoyoverse.com/static-resource-v2/2024/04/12/74330de1ee71ada37bbba7b72775c9d3_1883015313866544428.png",
    },
    url: {
      info: "https://sg-public-api.hoyolab.com/event/luna/os/info",
      home: "https://sg-public-api.hoyolab.com/event/luna/os/home",
      sign: "https://sg-public-api.hoyolab.com/event/luna/os/sign",
    },
  },
  zenless: {
    ACT_ID: "e202406031448091",
    successMessage: "축하드려요! 로프꾼님, 보상을 받으셨어요!",
    signedMessage: " 로프꾼님, 보상을 이미 받으셨어요!",
    game: "zenless",
    game_id: 8,
    assets: {
      author: "Eous",
      game: "Zenless Zone Zero",
      icon: "https://zenless.hoyoverse.com/favicon.ico",
    },
    url: {
      info: "https://sg-public-api.hoyolab.com/event/luna/zzz/os/info",
      home: "https://sg-public-api.hoyolab.com/event/luna/zzz/os/home",
      sign: "https://sg-public-api.hoyolab.com/event/luna/zzz/os/sign",
    },
  },
};
export const config: ConfigType = {
  genshin: {
    config: DEFAULT_CONSTANTS.genshin,
  },
  honkai: {
    config: DEFAULT_CONSTANTS.honkai,
  },
  starrail: {
    config: DEFAULT_CONSTANTS.starrail,
  },
  zenless: {
    config: DEFAULT_CONSTANTS.zenless,
  },
};
