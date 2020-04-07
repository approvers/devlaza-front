import * as React from "react";
import * as styles from "css/comp/Footer.module.css";
import { Divider } from "@material-ui/core";

interface footerListBase {
  title: string;
  contents: string[];
  inList?: footerList[];
}
interface footerList {
  list: footerListBase[];
}

const data: footerList = {
  list: [
    {
      title: "プロジェクトを探す",
      contents: ["人気プロジェクト", "条件を指定して検索"],
    },
    {
      title: "プロジェクトを作る",
      contents: ["プロジェクトを作成"],
    },
    {
      title: "ユーザーを探す",
      contents: ["名前から探す"],
      // 例↓
      inList: [
        {
          list: [
            {
              title: "いいねした人",
              contents: ["一覧"],
            },
          ],
        },
      ],
    },
  ],
};

const unfoldingFooterList = (dataList: footerList) => {
  return (
    <React.Fragment>
      {dataList.list.map((value: footerListBase, i: number) => {
        return (
          <div className={styles.footer_row} key={i}>
            <div className={styles.footer_row_title}>{value.title}</div>
            <Divider light />
            <ul className={styles.footer_row_content}>
              {value.contents?.map((contents: string, index: number) => {
                return <li key={index}>・{contents}</li>;
              })}
            </ul>
            {value.inList !== null ? unfoldingInList(value) : ""}
          </div>
        );
      })}
    </React.Fragment>
  );
};

const unfoldingInList = (value: footerListBase) => {
  return value.inList?.map((list: footerList, inListIndex: number) => {
    return (
      <div className={styles.inList_contents_wrapper} key={inListIndex}>
        {unfoldingFooterList(list)}
      </div>
    );
  });
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_contents_wrapper}>
        {unfoldingFooterList(data)}
      </div>
      <div className={styles.copyright}>
        ©2020 Devlaza †Approvers† All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
