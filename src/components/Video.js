import Video from 'react-native-video';
import {View} from 'react-native';

const VideoPlayer = () => {
  return (
    <View>
      <Video
        source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
        ref={ref => (this.player = ref)}
        style={{width: 300, height: 400}}
      />
    </View>
  );
};

export default VideoPlayer;
