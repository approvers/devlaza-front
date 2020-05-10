import { Tag } from "lib/model/Tag";
import * as TagAPI from "lib/api/TagAPI";

export class TagList implements Iterable<Tag> {
  private readonly tagList: Tag[];

  readonly length: number;

  constructor(tags: Tag[] = []) {
    if (typeof tags === "undefined") {
      this.tagList = [];
    } else {
      this.tagList = [...tags];
    }
    this.length = this.tagList.length;
  }

  async concatFromName(name: string): Promise<TagList> {
    const findAPIResult = await TagAPI.find(name);
    let tagID;
    if (findAPIResult.code === 404) {
      const createAPIResult = await TagAPI.create(name);
      tagID = createAPIResult.received[0].uuid;
    } else {
      tagID = findAPIResult.received[0].uuid;
    }

    if (this.hasId(tagID)) {
      return new TagList([...this.tagList]);
    }

    return new TagList([
      ...this.tagList,
      {
        name: name,
        uuid: tagID,
      },
    ]);
  }

  deleteFromId(uuid: string): TagList {
    return new TagList(this.tagList.filter((value) => value.uuid !== uuid));
  }

  hasId(uuid: string) {
    const matched = this.tagList.find((value) => value.uuid === uuid);
    return typeof matched !== "undefined";
  }

  [Symbol.iterator](): Iterator<Tag> {
    return [...this.tagList][Symbol.iterator]();
  }
}
