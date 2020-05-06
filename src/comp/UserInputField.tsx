import * as React from "react";
import { Chip, TextField, Avatar } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import * as styles from "css/comp/UserInputField.module.css";
import { GetTagProps } from "@material-ui/lab/Autocomplete/Autocomplete";
import { User } from "lib/model/User";
import { UserAPI, UserAPIResult } from "../lib/api/UserAPI";

type UserInputFieldProps = {
  onChange: (newSelectedUserIds: string[]) => void;
};

type UserInputFieldState = {
  pendingUsername: string;
  suggestedUsers: User[];
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
      loading: false,
    };
    this.pendingRequestTimerId = null;
  }

  handleUserSelectChange = (value: User[]) => {
    this.setState({
      suggestedUsers: [],
    });
    this.props.onChange(value.map((e) => e.showId));
  };

  handlePendingInputChange = (value: string) => {
    this.setState({
      pendingUsername: value,
    });

    if (this.pendingRequestTimerId != null) {
      clearTimeout(this.pendingRequestTimerId);
    }

    if (value.length === 0 || this.state.loading) {
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

  getChipsFromUsers = (users: User[], otherProps: GetTagProps) => {
    return users.map((option: User, index) => (
      <Chip
        avatar={
          <Avatar src={option.pictureUrl} alt={`${option.name}'s icon`} />
        }
        key={option.showId}
        variant="outlined"
        label={option.name}
        {...otherProps({ index })}
      />
    ));
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
      <Autocomplete
        id="user-name"
        filterSelectedOptions
        fullWidth
        multiple
        forcePopupIcon={false}
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
        renderTags={this.getChipsFromUsers}
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
    );
  }
}

export default UserInputField;
