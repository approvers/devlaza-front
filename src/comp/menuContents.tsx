import * as React from "react";
import * as styles from "css/comp/Header.module.css";
import { headerButton } from "../theme";
import { Button } from "@material-ui/core";
import { AccountCircle, PersonAdd, Code } from "@material-ui/icons";

type buttonProps = {
  changeMenuListStatus: (flag: boolean) => void;
  showMenuIcon: boolean;
};

type contents = {
  icon: React.ReactNode;
  name: string;
};
type buttonContents = {
  button: contents[];
};

const buttonData: buttonContents = {
  button: [
    {
      icon: <Code fontSize="small" />,
      name: "人気プロジェクト",
    },
    {
      icon: <PersonAdd fontSize="small" />,
      name: "新規登録",
    },
    {
      icon: <AccountCircle fontSize="small" />,
      name: "ログイン",
    },
  ],
};

const ButtonModel = (props: buttonProps) => {
  const style = headerButton(props.showMenuIcon);
  return (
    <>
      {buttonData.button.map((value: contents, index: number) => {
        return (
          <Button
            key={index}
            startIcon={value.icon}
            color="secondary"
            className={styles.header_btn}
            style={style}
            onClick={() => props.changeMenuListStatus(false)}
          >
            {value.name}
          </Button>
        );
      })}
    </>
  );
};

export default ButtonModel;
