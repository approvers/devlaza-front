import * as React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import * as styles from "css/comp/UserInputField.module.css";
import { User } from "lib/model/User";
import { UserAPI, UserAPIResult } from "../lib/api/UserAPI";
import ListElementTag from "./ListElementTag";

type UserInputFieldProps = {
  onChange: (newSelectedUserIds: string[]) => void;
};

type UserInputFieldState = {
  pendingUsername: string;
  suggestedUsers: User[];
  selectedUsers: User[];
  loading: boolean;
};

class UserInputField extends React.Component<
  UserInputFieldProps,
  UserInputFieldState
> {
  private pendingRequestTimerId: number | null;

  constructor(props: UserInputFieldProps) {
    super(props);

    this.state = {
      pendingUsername: "",
      suggestedUsers: [],
      selectedUsers: [],
      loading: false,
    };
    this.pendingRequestTimerId = null;
  }

  handleUserSelectChange = (value: User[]) => {
    this.setState({
      suggestedUsers: [],
      selectedUsers: value,
    });
    this.props.onChange(value.map((e) => e.uuid));
  };

  handleUserRemoved = (removedUser: User) => {
    const newUsers = this.state.selectedUsers.filter(
      (value) => removedUser.uuid !== value.uuid
    );
    this.handleUserSelectChange(newUsers);
  };

  handlePendingInputChange = (value: string) => {
    this.setState({
      pendingUsername: value,
    });

    if (this.pendingRequestTimerId != null) {
      clearTimeout(this.pendingRequestTimerId);
    }

    if (value.length < 2 || this.state.loading) {
      this.setState({
        suggestedUsers: [],
      });
      return;
    }

    this.pendingRequestTimerId = setTimeout(
      this.launchSuggestionRequest,
      1000,
      value
    );
  };

  launchSuggestionRequest = async () => {
    this.setState({
      loading: true,
      suggestedUsers: [],
    });
    let apiResult: UserAPIResult;
    if (this.state.pendingUsername.startsWith("@")) {
      apiResult = await UserAPI.searchUserFromName(this.state.pendingUsername);
    } else {
      apiResult = await UserAPI.searchUserFromShowId(
        this.state.pendingUsername
      );
    }

    this.setState({
      loading: false,
      suggestedUsers: apiResult.received,
    });
  };

  getOptionFromUser = (user: User) => {
    return (
      <>
        <img
          className={styles.user_image}
          src={user.pictureUrl}
          alt={`${user.name}'s icon`}
        />
        <span className={styles.user_name}>{user.name}</span>
        <span className={styles.user_id}>@{user.showId}</span>
      </>
    );
  };

  componentWillUnmount(): void {
    if (this.pendingRequestTimerId != null) {
      clearTimeout(this.pendingRequestTimerId);
    }
  }

  render() {
    const isSearchingById = this.state.pendingUsername.startsWith("@");

    const filterOptions = createFilterOptions({
      ignoreCase: true,
      matchFrom: "start",
      stringify: (option: User) =>
        isSearchingById ? "@" + option.showId : option.name,
    });

    return (
      <>
        {this.state.selectedUsers.map((value, index) => (
          <ListElementTag
            caption={value.name}
            imageUrl={value.pictureUrl}
            onDelete={() => {
              this.handleUserRemoved(value);
            }}
            key={index}
          />
        ))}
        <div className={styles.textbox_wrapper}>
          <Autocomplete
            id="user-name"
            disableClearable
            filterSelectedOptions
            fullWidth
            multiple
            forcePopupIcon={false}
            value={this.state.selectedUsers}
            loading={this.state.loading}
            loadingText="読み込み中です…"
            noOptionsText="見つかりませんでした"
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.uuid === value.uuid}
            onInputChange={(_, value) => {
              this.handlePendingInputChange(value);
            }}
            onChange={(_, value) => {
              this.handleUserSelectChange(value);
            }}
            options={this.state.suggestedUsers}
            renderTags={() => null}
            renderOption={this.getOptionFromUser}
            renderInput={(params) => (
              <TextField
                {...params}
                label="招待するユーザー名"
                placeholder="@をつけるとユーザーIDで検索することもできます。"
                variant="outlined"
              />
            )}
          />
        </div>
      </>
    );
  }
}

export default UserInputField;
