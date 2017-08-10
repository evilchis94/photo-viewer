import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  processColor,
  NativeModules,
  CameraRoll
} from "react-native";

import PhotoView from "./photo-viewer";

const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");

const cat = require("./cat-2575694_1920.jpg");

const photos = [
  {
    url:
      "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
    source: resolveAssetSource({
      uri:
        "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
    }),
    title: "Flash End-of-Life",
    summary:
      "Adobe announced its roadmap to stop supporting Flash at the end of 2020. ",
    // must be valid hex color or android will crashes
    titleColor: "#f90000",
    summaryColor: "green"
  },
  {
    url: "",
    source: resolveAssetSource(cat),
    title: "Local image"
  },

  // {
  //   url:
  //     "https://images.pexels.com/photos/142615/pexels-photo-142615.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
  // },
  // {
  //   url:
  //     "https://images.pexels.com/photos/82072/cat-82072.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
  // },
  // {
  //   url:
  //     "https://images.pexels.com/photos/248261/pexels-photo-248261.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
  // },
  {
    url: "https://media.giphy.com/media/xT39CSUZtc1T1iKgc8/giphy.gif",
    source: {
      uri: "http://127.0.0.1:8082/Kapture%202017-08-09%20at%2016.32.12.gif"
    },
    title: "gif 1"
  },
  {
    url: "https://media.giphy.com/media/3o6vXWzHtGfMR3XoXu/giphy.gif",
    source: {
      uri: "https://media.giphy.com/media/3o6vXWzHtGfMR3XoXu/giphy.gif"
    },
    title: "gif 1"
  }
];
export default class Photos extends Component {
  static navigationOptions = {
    title: "Photo Viewer"
  };
  state = {
    visible: false,
    initial: 0,
    edges: [],
    photos
  };
  render() {
    const imageSize = Dimensions.get("window").width / 3;

    const imageStyle = {
      width: imageSize,
      height: imageSize
    };
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Photo Viewer</Text>
        <PhotoView
          visible={this.state.visible}
          data={this.state.photos}
          hideStatusBar={true}
          initial={this.state.initial}
          onDismiss={e => {
            this.setState({ visible: false });
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.photoContainer}>
            {this.state.photos.map((cat, index) =>
              <TouchableOpacity
                key={index}
                style={[imageStyle, {}]}
                ref={r => (this.r = r)}
                onPress={() => this.setState({ visible: true, initial: index })}
              >
                <Image style={imageStyle} source={cat.source} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <Button
          title="Choose Photo "
          onPress={() => {
            CameraRoll.getPhotos({
              first: 10
            }).then(res => {
              console.log(res);
              if (res.edges) {
                const edgesUrls = res.edges.map(edge => {
                  return {
                    source: edge.node.image
                  };
                });
                console.log(edgesUrls);
                this.setState({ photos: this.state.photos.concat(edgesUrls) });
              }
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5"
  },
  photoContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  h1: {
    padding: 40,
    textAlign: "center",
    fontSize: 24
  }
});
