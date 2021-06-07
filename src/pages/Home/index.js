import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatusBarPage from "../../components/StatusBarPage";
import Menu from "../../components/Menu";
import { Feather } from "@expo/vector-icons";
import ModalLink from "../../components/ModalLink";
import {saveLink} from "../../utils/storeLinks";
import {
  ContainerLogo,
  Logo,
  ContainerContent,
  Title,
  SubTitle,
  ContainerInput,
  BoxIcon,
  Input,
  ButtonLink,
  ButtonText,
} from "./styles";

import api from "../../services/api";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState('');

  async function handleShortLink() {
    setLoading(true);
    try {
      const response = await api.post("/shorten", {
        long_url: url,
      });

      setData(response.data);
      setModalVisible(true);

      saveLink('links', response.data);

      Keyboard.dismiss();
      setLoading(false);
      setUrl("");

    } catch {
      alert("Ops parece que algo deu errado");
      Keyboard.dismiss();
      setUrl("");
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#1ddbb9", "#132442"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <StatusBarPage barStyle="light-content" backgroundColor="#1ddbb9" />
        <Menu />

        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "position"}
          enabled
        >
          <ContainerLogo>
            <Logo
              source={require("../../assets/Logo.png")}
              resizeMode="contain"
            />
          </ContainerLogo>

          <ContainerContent>
            <Title>Encurta Links</Title>
            <SubTitle>Cole seu link para encurtar</SubTitle>

            <ContainerInput>
              <BoxIcon>
                <Feather name="link" size={22} color="#FFF" />
              </BoxIcon>
              <Input
                placeholder="Cole seu link aqui"
                placeholderTextColor="white"
                autoCapitalize="none"
                autoCurrent={false}
                keyboardType="url"
                value={url}
                onChangeText={(text) => setUrl(text)}
              />
            </ContainerInput>

            <ButtonLink onPress={() => handleShortLink()}>
              {loading ? (
                <ActivityIndicator size={24} color="#121212" />
              ) : (
                <ButtonText>Gerar Link</ButtonText>
              )}
            </ButtonLink>
          </ContainerContent>
        </KeyboardAvoidingView>

        <Modal visible={modalVisible} transparent animationType="slide">
          <ModalLink onClose={() => setModalVisible(false)} data={data} />
        </Modal>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
