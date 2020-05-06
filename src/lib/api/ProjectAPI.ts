import { Project } from "lib/model/Project";

/**
 * APIを叩いた結果が代入されるクラス。
 */
export type ProjectAPIResult = {
  /**
   * APIが返したレスポンスコード。
   */
  code: number;
  /**
   * APIが返したプロジェクト。
   */
  received: Project[];
};

/**
 * Projectに関するAPIを叩くクラス。
 */
export class ProjectAPI {
  /**
   * プロジェクトを作成する。
   * @param name 名前
   * @param introduction 説明
   */
  static async create(
    name: string,
    introduction: string
  ): Promise<ProjectAPIResult> {
    // TODO: APIを叩く
    await new Promise((resolver) => setTimeout(resolver, 50));
    return {
      code: 200,
      received: [
        {
          name: name,
          introduction: introduction,
          recruiting: true,
          uuid: `uuid for ${name}`,
          createdAt: new Date(),
          createdOwner: `uuid for the user who made ${name}`,
        },
      ],
    };
  }
}
