import { Site } from "../model/Site";

/**
 * APIを叩いた結果が代入される型。
 */
export type SiteAPIResult = {
  /**
   * APIが返したレスポンスコード。
   */
  code: number;
  /**
   * APIが返したSite。
   */
  received: Site[];
};

/**
 * 新しくサイトを作成する。
 * @param description 作成するサイトの説明文
 * @param url サイトのURL
 * @param projectId サイトが所属するプロジェクトのID
 */
export async function create(
  description: string,
  url: string,
  projectId: string
): Promise<SiteAPIResult> {
  // TODO: APIを叩く
  await new Promise((resolver) => setTimeout(resolver, 50));
  return {
    code: 200,
    received: [
      {
        description: description,
        url: url,
        uuid: `UUID for ${description}`,
        projectId: projectId,
      },
    ],
  };
}
