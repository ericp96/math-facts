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
      source={require('../assets/images/right-answers/right-icon.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-explosion.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-gift.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-firework-star.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-fireworks.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-puppy.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-fox-chair.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/tiger.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ style, onAnimationFinish }: AnimationProps) => (
    <LottieView
      style={style}
      source={require('../assets/images/right-answers/right-checkmark.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
];

export default function RightAnswer({ style, onAnimationFinish }: AnimationProps) {
  const whichOne = Math.floor(Math.random() * animations.length);
  const Component = animations[whichOne];
  return <Component style={style} onAnimationFinish={onAnimationFinish} />;
}
