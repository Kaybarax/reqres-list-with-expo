import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import DataLoading from "./data-loading";

const UsersApi = "https://reqres.in/api/users";
const getUsersByPageApi = (page: number) =>
  `https://reqres.in/api/users?page=${page}`;

const UsersList: React.FC = () => {
  const navigation = useNavigation();
  const [fetchedData, setFetchedData] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const startPage = React.useRef(1);

  React.useEffect(() => {
    setLoading(true);
    fetch(UsersApi).then((response) => {
      response.json().then((data) => {
        setFetchedData([...data.data]);
        setLoading(false);
      });
    });
  }, [setLoading, setFetchedData]);

  const handleLoadMore = React.useCallback(() => {
    setLoading(true);
    startPage.current = startPage.current + 1;
    fetch(getUsersByPageApi(startPage.current)).then((response) => {
      response.json().then((data) => {
        if (data?.data?.length >= 1) {
          setFetchedData([...fetchedData, ...data.data]);
        }
        setLoading(false);
      });
    });
  }, [setFetchedData, setLoading]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.6}
      // @ts-ignore
      onPress={() => navigation.navigate("User Details", { userId: item.id })}
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <View>
        <Image
          source={{ uri: item.avatar }}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 25,
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text>{item?.first_name}</Text>
          <Text>&nbsp;</Text>
          <Text>{item?.last_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  if (loading) {
    return <DataLoading />;
  }
  return (
    <FlashList
      data={fetchedData}
      renderItem={({ item }) => renderItem({ item })}
      estimatedItemSize={200}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={() => (
        <View style={{ marginTop: 10 }}>
          <Button title={"Load More"} onPress={handleLoadMore} />
        </View>
      )}
    />
  );
};

export default UsersList;
