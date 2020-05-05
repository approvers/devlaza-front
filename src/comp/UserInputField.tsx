import * as React from "react";
import { Chip, TextField, Avatar } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

import * as styles from "css/comp/UserInputField.module.css";
import { GetTagProps } from "@material-ui/lab/Autocomplete/Autocomplete";
import { User } from "api/User";

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
    this.props.onChange(value.map((e) => e.id));
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

  launchSuggestionRequest = () => {
    this.setState({
      loading: true,
      suggestedUsers: [],
    });
    (async () => {
      // TODO: ここでAPIをぶっ叩いて、候補となるユーザーを提示してもらう
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.setState({
        loading: false,
        suggestedUsers: [
          {
            id: "unlimit-highchi",
            name: "H.ichiyo",
            imageUrl: `${process.env.PUBLIC_URL}/higuchi.png`,
          },
          {
            id: "dev-ichiyo",
            name: "Ichiyo.h",
            imageUrl: `${process.env.PUBLIC_URL}/higuchi.png`,
          },
        ],
      });
    })();
  };

  getChipsFromUsers = (users: User[], otherProps: GetTagProps) => {
    return users.map((option: User, index) => (
      <Chip
        avatar={<Avatar src={option.imageUrl} alt={`${option.name}'s icon`} />}
        key={option.id}
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
          src={user.imageUrl}
          alt={`${user.name}'s icon`}
        />
        <span className={styles.user_name}>{user.name}</span>
        <span className={styles.user_id}>@{user.id}</span>
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
        isSearchingById ? "@" + option.id : option.name,
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
        getOptionSelected={(option, value) => option.id === value.id}
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
