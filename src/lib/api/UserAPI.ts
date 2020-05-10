import { User } from "lib/model/User";

/**
 * APIの実行結果が代入される型
 */
export type UserAPIResult = {
  /**
   * APIが返したレスポンスコード。
   */
  code: number;
  /**
   * APIが返したUser。
   */
  received: User[];
};

// TODO: APIとの接続が実装され次第消す
const sampleUser = [
  {
    uuid: "1",
    bio: "unlimited developer",
    birthDay: new Date(1872, 5, 1),
    favoriteLang: "Typescript",
    showId: "unlimit-highchi",
    name: "H.ichiyo",
    pictureUrl: `${process.env.PUBLIC_URL}/higuchi.png`,
  },
  {
    uuid: "2",
    bio: "another unlimited developer",
    birthDay: new Date(1872, 5, 1),
    favoriteLang: "Typescript",
    showId: "dev-ichiyo",
    name: "Ichiyo Higuchi",
    pictureUrl: `${process.env.PUBLIC_URL}/higuchi.png`,
  },
];

/**
 * 名前からユーザーを検索する。
 */
export async function searchUserFromName(
  query: string
): Promise<UserAPIResult> {
  console.log(`[UserAPI] searching users ${query}`);
  // TODO: APIをぶっ叩いて名前でユーザー検索する
  await new Promise((resolver) => setTimeout(resolver, 250));
  return {
    code: 200,
    received: sampleUser,
  };
}

/**
 * showIDからユーザーを検索する。
 */
export async function searchUserFromShowId(
  query: string
): Promise<UserAPIResult> {
  console.log(`[UserAPI] searching users ${query}`);
  // TODO: APIをぶっ叩いてshowID(Twitterの@で始まるアレ)でユーザー検索する
  await new Promise((resolver) => setTimeout(resolver, 250));
  return {
    code: 200,
    received: sampleUser,
  };
}
