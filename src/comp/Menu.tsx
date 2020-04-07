import * as React from "react";
import * as styles from "css/comp/Header.module.css";
import ButtonModel from "./menuContents";
import { InputBase, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";

type searchProps = {
  searchbox: string;
  handleSearchBoxChange: (inputValue: string) => void;
};

type menuProps = {
  showMenuIcon: boolean;
  moveSearchContents: boolean;
} & searchProps;

export const SearchContents = (props: searchProps) => {
  return (
    <div className={styles.header_search}>
      <InputBase
        className={styles.header_search_text}
        color="secondary"
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={props.searchbox}
        onChange={(e) => props.handleSearchBoxChange(e.target.value)}
      />
      <IconButton className={styles.header_search_btn}>
        <Search />
      </IconButton>
    </div>
  );
};

export const HeaderMenu = (props: menuProps) => {
  let searchContent: JSX.Element;
  if (props.moveSearchContents) {
    searchContent = (
      <SearchContents
        handleSearchBoxChange={props.handleSearchBoxChange}
        searchbox={props.searchbox}
      />
    );
  } else {
    searchContent = <></>;
  }
  return (
    <React.Fragment>
      <div className={styles.header_button_wrapper}>
        {searchContent}
        <ButtonModel showMenuIcon={props.showMenuIcon} />
      </div>
    </React.Fragment>
  );
};

export default HeaderMenu;
