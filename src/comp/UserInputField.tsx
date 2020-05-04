import * as React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";

import * as styles from "css/comp/UserInputField.module.css";

type User = {
  id: string;
  name: string;
  imageUrl: string;
};

type UserInputFieldProps = {
  onChange: (newSelectedUserIds: string[]) => void;
};

type UserInputFieldState = {
  pendingUsername: string;
  suggestedUser: User[];
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
      suggestedUser: [],
      loading: false,
    };
    this.pendingRequestTimerId = null;
  }

  handleUserSelectChange = (value: User[]) => {
    this.setState({
      suggestedUser: [],
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
        suggestedUser: [],
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
      suggestedUser: [],
    });
    (async () => {
      // TODO: ここでAPIをぶっ叩いて、候補となるユーザーを提示してもらう
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.setState({
        loading: false,
        suggestedUser: [
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
        options={this.state.suggestedUser}
        renderTags={(value: User[], getTagProps) => (
          <>
            {value.map((option: User, index: number) => (
              <Chip
                avatar={
                  <Avatar src={option.imageUrl} alt={`${option.name}'s icon`} />
                }
                key={option.id}
                variant="outlined"
                label={option.name}
                {...getTagProps({ index })}
              />
            ))}
          </>
        )}
        renderOption={(option) => (
          <>
            <img
              className={styles.user_image}
              src={option.imageUrl}
              alt={`${option.name}'s icon`}
            />
            <span className={styles.user_name}>{option.name}</span>
            <span className={styles.user_id}>@{option.id}</span>
          </>
        )}
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
