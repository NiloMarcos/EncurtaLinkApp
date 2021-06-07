import React from "react";
import {
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import clipboard from "expo-clipboard";
import {
  ModalContainer,
  Container,
  Header,
  LinkArea,
  Title,
  LongUrl,
  ShortLinkArea,
  ShortLinkUrl,
} from "./styles";

export default function ModalLink({ onClose, data }) {
  function copyLink() {
    clipboard.setString(data.link);
    alert("Link copiado com sucesso");
  }

  async function handleShare() {
    try {
      const result = await Share.share({
        message: `Link: ${data.link}`,
      });

      if (result.action === Share.shareAction) {
        if (result.activityType) {
          console.log("activityType");
        } else {
          console.log("compartilhado com sucesso");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Modal fechado");
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  
  return (
    <ModalContainer>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>
      <Container>
        <Header>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={30} color="#212743" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Feather name="share" size={30} color="#212743" />
          </TouchableOpacity>
        </Header>

        <LinkArea>
          <Title>Link encurtado</Title>
          <LongUrl numberOfLines={1}>{data.long_url}</LongUrl>

          <ShortLinkArea activeOpacity={1} onPress={copyLink}>
            <ShortLinkUrl numberOfLines={1}>{data.link}</ShortLinkUrl>
            <TouchableOpacity onPress={copyLink}>
              <Feather name="copy" color="#FFF" size={25} />
            </TouchableOpacity>
          </ShortLinkArea>
        </LinkArea>
      </Container>
    </ModalContainer>
  );
}
