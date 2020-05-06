import { Tag } from "lib/model/Tag";

/**
 * APIを叩いた結果が代入される型。
 */
export type TagAPIResult = {
  /**
   * APIが返したレスポンスコード。
   */
  code: number;
  /**
   * APIが返したTag。
   */
  received: Tag[];
};

// TODO: APIとの接続が実装され次第消す
const sampleTags: Tag[] = [
  {
    name: "Qiita",
    uuid: "tag-sample-Qiita",
  },
  {
    name: "React",
    uuid: "tag-sample-React",
  },
];

/**
 * タグに関するAPIを叩くクラス。
 */
export class TagAPI {
  /**
   * タグを新規作成する。
   * @param name タグの名前。
   */
  static async create(name: string): Promise<TagAPIResult> {
    // TODO: APIをぶっ叩く
    await new Promise((resolver) => setTimeout(resolver, 50));
    return {
      code: 200,
      received: [
        {
          name: name,
          uuid: `uuid for ${name}`,
        },
      ],
    };
  }

  /**
   * タグ名からタグを取得する。
   * @param name 検索対象の名前。
   * @result 見つかったタグ。見つからなかった場合はcodeに404が入る。
   */
  static async find(name: string): Promise<TagAPIResult> {
    // TODO: APIをぶっ叩く
    await new Promise((resolver) => setTimeout(resolver, 50));

    const findTag = sampleTags.filter((value) => value.name === name);
    if (findTag.length === 0) {
      return {
        code: 404,
        received: [],
      };
    }

    return {
      code: 200,
      received: findTag,
    };
  }

  /**
   * 指定したタグをプロジェクトに登録する。
   * @param tagId タグのUUID。
   * @param projectID プロジェクトのUUID。
   */
  static async belongToProject(
    tagId: string,
    projectID: string
  ): Promise<TagAPIResult> {
    console.log(`[TagAPI] Belonging tag '${tagId}' to project '${projectID}'.`);
    // TODO: APIをぶっ叩く
    await new Promise((resolver) => setTimeout(resolver, 50));
    return {
      code: 200,
      received: [],
    };
  }
}
