import * as React from "react";
import { Link } from "@material-ui/core";
import { Twitter, GitHub, Mail } from "@material-ui/icons";
import * as styles from "css/comp/pages/UserDetailsPage.module.css";

type AccountLinkProps = {
  accounts: AccountType;
  showList: Array<keyof AccountType>;
  isPhone: boolean;
};

export type AccountType = {
  github: string;
  twitter: string;
  mailAddress: string;
};

type AccountTypeOfElement = {
  github: JSX.Element;
  twitter: JSX.Element;
  mailAddress: JSX.Element;
};

const accountsIcons: AccountTypeOfElement = {
  twitter: <Twitter fontSize="small" />,
  github: <GitHub fontSize="small" />,
  mailAddress: <Mail fontSize="small" />,
};

const url: AccountType = {
  twitter: "https://twitter.com/",
  github: "https://github.com/",
  mailAddress: "mailto:",
};

export const AccountLink = (props: AccountLinkProps) => {
  const accounts: AccountType = props.accounts;
  const accountElement = props.showList.map(
    (
      accountName: keyof AccountType | keyof AccountTypeOfElement,
      i: number
    ) => {
      return (
        <Link
          className={styles.iconAndText}
          color="secondary"
          key={i}
          href={url[accountName] + accounts[accountName]}
        >
          <p>{accountsIcons[accountName]}</p>
          {props.isPhone ? <></> : <p>{accounts[accountName]}</p>}
        </Link>
      );
    }
  );
  return <>{accountElement}</>;
};
