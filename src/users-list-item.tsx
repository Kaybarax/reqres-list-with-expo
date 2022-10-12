import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import DataLoading from "./data-loading";

const getUserDetailsApi = (id: number) => `https://reqres.in/api/users/${id}`;

const UsersListItem: React.FC = (props) => {
  // @ts-ignore
  const {
    // @ts-ignore
    route: {
      params: { userId },
    },
  } = props;

  const [userData, setUserData] = React.useState<{
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  }>();

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    const userDataApi = getUserDetailsApi(userId);
    fetch(getUserDetailsApi(userId)).then((response) => {
      response.json().then((data) => {
        setUserData(data.data);
        setLoading(false);
      });
    });
  }, [setUserData, setLoading, userId]);

  if (loading) {
    return <DataLoading />;
  }

  return (
    <View style={{ padding: 10 }}>
      <Image
        source={{ uri: userData?.avatar }}
        style={{ width: 50, height: 50 }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text>{userData?.first_name}</Text>
        <Text>&nbsp;</Text>
        <Text>{userData?.last_name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:${userData?.email}`)}
      >
        <Text
          style={{
            textDecorationLine: "underline",
            color: "blue",
          }}
        >
          {userData?.email}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsersListItem;
