import React from "react";
import { StyleSheet, Modal, ActivityIndicator, FlatList } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Image } from "react-native-elements";

interface Props {
  images: string[];
}

export function PlaceImage({ images }: Props) {
  const [modal, setModal] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);

  const ImageModal = () => {
    const imageViewerProps = images.map((value) => ({ url: value }));
    return (
      <Modal visible={modal} transparent>
        <ImageViewer
          imageUrls={imageViewerProps}
          index={imageIndex}
          onCancel={() => {
            setModal(false);
          }}
          enableSwipeDown
          enableImageZoom
          saveToLocalByLongPress
        />
      </Modal>
    );
  };
  return (
    <React.Fragment>
      <FlatList
        data={images}
        keyExtractor={(item) => {
          return (
            item.toString() +
            new Date().getTime().toString() +
            Math.floor(
              Math.random() * Math.floor(new Date().getTime())
            ).toString()
          );
        }}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item }}
            containerStyle={styles.picture}
            PlaceholderContent={<ActivityIndicator />}
            onPress={() => {
              setImageIndex(index);
              setModal(true);
            }}
          />
        )}
        horizontal
      />
      <ImageModal />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 16,
    marginRight: 8,
  },
});
