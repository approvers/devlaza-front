import * as React from "react";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
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
  textFieldValue: string;
  selectedUser: User[];
  suggestedUser: User[];
};

class UserInputField extends React.Component<
  UserInputFieldProps,
  UserInputFieldState
> {
  constructor(props: UserInputFieldProps) {
    super(props);

    this.state = {
      textFieldValue: "",
      selectedUser: [],
      suggestedUser: [
        {
          id: "higuchi",
          name: "H.ichiyo",
          imageUrl: `${process.env.PUBLIC_URL}/higuchi.png`,
        },
        {
          id: "ichiyo",
          name: "Ichiyo.h",
          imageUrl: `${process.env.PUBLIC_URL}/higuchi.png`,
        },
      ],
    };
  }

  render() {
    return (
      <Autocomplete
        id="user-name"
        debug
        filterSelectedOptions
        fullWidth
        multiple
        clearOnEscape
        onChange={(_, value) => {
          this.props.onChange(value.map((e) => e.id));
        }}
        options={this.state.suggestedUser}
        getOptionLabel={(option) => option.name}
        noOptionsText="該当するユーザーは存在しません"
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
