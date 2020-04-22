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

const DevExperience = () => {
  const returnChipContents = (tagList: string[]) => {
    if (tagList.length > 3) {
      tagList.splice(3);
    }
    return (
      <>
        {tagList.map((tag: string, i: number) => (
          <Chip
            className={styles.chip}
            variant="outlined"
            size="small"
            label={tag}
            key={i}
          />
        ))}
      </>
    );
  };

  const changeIntroductionStyle = (introduction: string) => {
    let intro = introduction;
    const sentenceLengthLimits = 80;
    if (introduction.length > sentenceLengthLimits) {
      intro = intro.substr(0, sentenceLengthLimits);
      intro += "...";
    }
    return intro;
  };

  const projectData = () => {
    let projectData = projectDataList;
    if (projectData.length > 4) {
      projectData = projectDataList.splice(0, 4);
    }
    return projectData;
  };

  return (
    <div className={styles.wrapper}>
      {projectData().map((projectDetails: projectDataType, i: number) => (
        <Card className={styles.card} variant="outlined" key={i}>
          <CardActionArea
            className={styles.action}
            onClick={() => {
              window.location.href = "/projects/detail/" + projectDetails.id;
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
      ))}
    </div>
  );
};

export default DevExperience;
