import * as React from "react";
import {
  Card,
  CardActionArea,
  Typography,
  Chip,
  CardContent,
  Divider,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import * as styles from "css/comp/DevExperience.module.css";

// type devExperienceProps = {
//   developmentExperienceId: number[];
// };

type projectDataType = {
  id: number;
  name: string;
  createdAt: string;
  createdUser: string;
  introduction: string;
  sites: string[][];
  tags: string[];
  member: string[];
  favs: number;
  recruiting: boolean;
  isLoaded: boolean;
};

type projectDataListType = projectDataType[];

// よくわからんのでdevelopmentExperienceIdに一致するデータを
// ↓に突っ込みました
const projectDataList = [
  {
    id: 7438921,
    name: "【React】Webサービス フロントエンド",
    createdAt: "2020/04/02",
    createdUser: "ichiyo",
    introduction:
      "バックのつよつよムーブが完了するとここがプロジェクトに基づいたものになります",
    sites: [
      ["GitHub", "https://github.com/"],
      ["Twitter", "https://twitter.com/"],
    ],
    tags: ["1", "2", "3", "4", "5"],
    member: ["haracho", "meme", "birb"],
    favs: 100,
    recruiting: true,
    isLoaded: true,
  },
  {
    id: 7438921,
    name: "【React】Webサービス フロントエンド",
    createdAt: "2020/04/02",
    createdUser: "ichiyo",
    introduction:
      "バックのつよつよムーブが完了するとここがプロジェクトに基づいたものになりますバックのつよつよムーブが完了するとここがプロジェクトに基づいたものになりますバックのつよつよムーブが完了するとここがプロジェクトに基づいたものになります",
    sites: [
      ["GitHub", "https://github.com/"],
      ["Twitter", "https://twitter.com/"],
    ],
    tags: ["1", "2", "3", "4", "5"],
    member: ["haracho", "meme", "birb"],
    favs: 100,
    recruiting: true,
    isLoaded: true,
  },
  {
    id: 7438921,
    name: "【React】Webサービス フロントエンド",
    createdAt: "2020/04/02",
    createdUser: "ichiyo",
    introduction:
      "バックのつよつよムーブが完了するとここがプロジェクトに基づいたものになります",
    sites: [
      ["GitHub", "https://github.com/"],
      ["Twitter", "https://twitter.com/"],
    ],
    tags: ["1", "2", "3", "4", "5"],
    member: ["haracho", "meme", "birb"],
    favs: 100,
    recruiting: true,
    isLoaded: true,
  },
];
// ↑消してね

const DevExperience = (/*props: devExperienceProps*/) => {
  const link = (id: number) => {
    window.location.href = "/projects/detail/" + id;
  };

  const returnChipContents = (tagList: string[]) => {
    if (tagList.length > 3) {
      tagList.splice(3);
    }
    return (
      <>
        {tagList.map((tag: string, i: number) => {
          return (
            <Chip
              className={styles.chip}
              variant="outlined"
              size="small"
              label={tag}
              key={i}
            />
          );
        })}
      </>
    );
  };

  const changeIntroductionStyle = (introduction: string) => {
    let intro = introduction;
    if (introduction.length > 80) {
      intro = intro.substr(0, 80);
      intro += "...";
    }
    return intro;
  };

  const returnDevProjectList = (projectData: projectDataListType) => {
    if (projectData.length > 4) {
      projectData = projectData.splice(0, 4);
    }
    return (
      <>
        {projectData.map((projectDetails: projectDataType, i: number) => {
          return (
            <Card className={styles.card} variant="outlined" key={i}>
              <CardActionArea
                className={styles.action}
                onClick={() => {
                  link(projectDetails.id);
                }}
              >
                <CardContent>
                  <h2 className={styles.projectTitle}>{projectDetails.name}</h2>
                  <Divider />
                  <div className={styles.createAt}>
                    <p>{projectDetails.createdAt} 作成</p>
                    <p>
                      <Favorite />
                      {projectDetails.favs}
                    </p>
                  </div>
                  <div className={styles.typography}>
                    <Typography>
                      {changeIntroductionStyle(projectDetails.introduction)}
                    </Typography>
                  </div>
                  <div className={styles.chipWrapper}>
                    {returnChipContents(projectDetails.tags)}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </>
    );
  };
  return (
    <div className={styles.wrapper}>
      {returnDevProjectList(projectDataList)}
    </div>
  );
};

export default DevExperience;
