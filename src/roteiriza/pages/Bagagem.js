import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import Header from "../components/Header";
import Container from "../components/Container";
import Body from "../components/Body";
import CheckboxForm from "../components/CheckboxForm";
import Typography from "../components/Typography";
import ImageBagagem from "../components/ImageBagagem";

const Bagagem = ({ userId }) => {
  const route = useRoute();
  const { viagemId } = route.params;

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxPress = (item) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem === item
    );
    if (index === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  return (
    <Container>
      <ImageBagagem />
      <Body>
        <ScrollView>
          <View style={styles.card}>
            <Typography style={styles.bodyText}>
              Adicione abaixo os itens que você deseja levar para sua viagem e
              monte um checklist!
            </Typography>
          </View>

          <CheckboxForm
            onCheckboxPress={handleCheckboxPress}
            viagemId={viagemId}
            userId={userId}
          />
        </ScrollView>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  bodyText: {
    color: "#063A7A",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 20,
  },
  card: {
    alignItems: "center",
  },
});

export default Bagagem;
