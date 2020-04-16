import * as React from "react";
import * as styles from "css/comp/Footer.module.css";
import { Divider } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import EventListener from "react-event-listener";

type footerContent = {
  caption: string;
  address: string;
};
type footerListBase = {
  title: string;
  contents: footerContent[];
};
type footerList = {
  list: footerListBase[];
};

const data: footerList = {
  list: [
    {
      title: "プロジェクトを探す",
      contents: [
        {
          caption: "人気プロジェクト",
          address: "/",
        },
        {
          caption: "条件を指定して検索",
          address: "/",
        },
      ],
    },
    {
      title: "プロジェクトを作る",
      contents: [
        {
          caption: "プロジェクトを作成",
          address: "/projects/create",
        },
      ],
    },
    {
      title: "ユーザーを探す",
      contents: [
        {
          caption: "名前から探す",
          address: "/",
        },
      ],
    },
  ],
};

const Footer = () => {
  const [accordion, changeStatus] = React.useState({
    isAccordion: window.innerWidth <= 450,
    openMenuNumber: -1,
  });

  const handleResize = () => {
    changeStatus({ ...accordion, isAccordion: window.innerWidth <= 450 });
  };

  const openListUpdate = (key: number) => {
    if (key === accordion.openMenuNumber || !accordion.isAccordion) {
      key = -1;
    }
    changeStatus({ ...accordion, openMenuNumber: key });
  };

  const unfoldingFooterList = (dataList: footerList) => {
    let listStyle: { height: number | string }, expand: JSX.Element;
    return (
      <>
        {dataList.list.map((value: footerListBase, i: number) => {
          if (accordion.openMenuNumber === i && accordion.isAccordion) {
            listStyle = { height: "auto" };
            expand = <ExpandMore className={styles.less} />;
          } else if (accordion.isAccordion) {
            listStyle = { height: 0 };
            expand = <ExpandMore className={styles.expand} />;
          } else {
            listStyle = { height: "auto" };
            expand = <></>;
          }
          return (
            <div className={styles.footer_row} key={i}>
              <div
                className={styles.footer_row_title}
                onClick={() => openListUpdate(i)}
              >
                {value.title}
                {expand}
              </div>
              <Divider light />
              <ul className={styles.footer_row_content} style={listStyle}>
                {value.contents?.map(
                  (contents: footerContent, index: number) => {
                    return (
                      <li key={index}>
                        <a href={contents.address}>・{contents.caption}</a>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <footer className={styles.footer}>
      <EventListener target="window" onResize={handleResize} />
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
