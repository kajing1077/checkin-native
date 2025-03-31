import axios from "axios";
import { AccountData, GameConfig, GameName } from "@/types";
import { config } from "@/constants";

type RewardData = {
  isSign: boolean;
  todayAward: {
    cnt: number;
    icon: string;
    name: string;
  };
};

function getSignGameHeader(gameName: GameName): string {
  switch (gameName) {
    case "starrail":
      return "hkrpg";
    case "genshin":
      return "hk4e";
    case "zenless":
      return "zzz";
    default:
      return "";
  }
}

async function sign(signUrl: string, actId: string) {
  const options = {
    act_id: actId,
    lang: "ko-kr",
  };

  const response = await axios.post(`${signUrl}`, options);
  const data = response.data;

  // console.log("sign", data);

  return data;
}

async function getSignInfo(
  cookie: string,
  infoUrl: string,
  gameName: GameName,
  actId: string
) {
  const response = await axios.get(`${infoUrl}?lang=ko-kr&act_id=${actId}`, {
    headers: {
      Cookie: cookie,
      "x-rpc-signgame": getSignGameHeader(gameName),
    },
  });

  // console.log(response);

  return response.data.data;
}

async function getAwardsData(
  cookie: string,
  homeUrl: string,
  gameName: GameName,
  actId: string
) {
  console.log("gamename", gameName);
  console.log(getSignGameHeader(gameName));
  const response = await axios.get(`${homeUrl}?lang=ko-kr&act_id=${actId}`, {
    headers: {
      Cookie: cookie,
      "x-rpc-signgame": getSignGameHeader(gameName),
    },
  });

  if (!response.data.data.awards) {
    console.log("리스트 에러 ");
  }

  return response.data.data.awards;
}

async function getAccountInfo(
  cookie: string,
  gameConfig: GameConfig
): Promise<RewardData | undefined> {
  const options = {
    headers: {
      Cookie: cookie,
    },
  };

  const match = cookie.match(/ltuid_v2=([^;]+)/);
  if (!match) {
    console.error("match error");
    return;
  }
  const ltuid = match[1];

  const url = `https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard?uid=${ltuid}`;
  const response = await axios.get(url, options);

  const data = response.data;

  const accountData: AccountData | undefined = data.data.list.find(
    (account: AccountData) => account.game_id === gameConfig.game_id
  );

  if (!accountData) {
    return;
  }

  const infoResult = await getSignInfo(
    cookie,
    gameConfig.url.info,
    gameConfig.game as GameName,
    gameConfig.ACT_ID
  );
  const awardList = await getAwardsData(
    cookie,
    gameConfig.url.home,
    gameConfig.game as GameName,
    gameConfig.ACT_ID
  );
  const awardIndex = infoResult.total_sign_day;

  // console.log("aaa", awardList[awardIndex]);

  const signResult = await sign(
    // cookie,
    gameConfig.url.sign,
    gameConfig.ACT_ID
  );

  console.log("signResult", signResult);

  return {
    todayAward: awardList[awardIndex - 1],
    isSign: infoResult.is_sign,
  };
}

async function processGameData(cookie: string) {
  const results: Record<GameName, RewardData | undefined> = {
    genshin: undefined,
    honkai: undefined,
    starrail: undefined,
    zenless: undefined,
  };

  for (const gameName in config) {
    const gameData = config[gameName as GameName];
    if (gameData) {
      const result = await getAccountInfo(cookie, gameData.config);
      results[gameName as GameName] = result;
    }
  }

  return results;
}

export { getAccountInfo, processGameData };
