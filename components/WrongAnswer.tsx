import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';

type AnimationProps = {
  style: StyleProp<ViewStyle>;
  onAnimationFinish: (isCancelled: boolean) => void;
};

const animations = [
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/wrong-answers/wrong-icon.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      speed={1.3}
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/wrong-answers/wrong-explosion-pan.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/wrong-answers/wrong-answer-bomb.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/wrong-answers/wrong-heart.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/wrong-answers/bike-crash.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/wrong-answers/monkey-wrong.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
];

export default function WrongAnswer({ style, onAnimationFinish }: AnimationProps) {
  const whichOne = Math.floor(Math.random() * animations.length);
  const Component = animations[whichOne];
  return <Component style={style} onAnimationFinish={onAnimationFinish} />;
}
