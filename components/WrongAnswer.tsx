import LottieView from 'lottie-react-native';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import { MonoText } from './library/StyledText';

type AnimationProps = {
  style: StyleProp<ViewStyle>;
  onAnimationFinish: (isCancelled: boolean) => void;
};

type ComponentProps = {
  onAnimationFinish: (isCancelled: boolean) => void;
};

const animations = [
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/wrong-answers/wrong-icon.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      speed={1.3}
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/wrong-answers/wrong-explosion-pan.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/wrong-answers/wrong-answer-bomb.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/wrong-answers/wrong-heart.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/wrong-answers/bike-crash.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/wrong-answers/monkey-wrong.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
    />
  ),
];

const affirmations = ['Try Again!', 'Oops!', 'Incorrect', 'Wrong'];

export default function WrongAnswer({ style, onAnimationFinish }: AnimationProps) {
  const whichOne = Math.floor(Math.random() * animations.length);
  const whichAffirmation = Math.floor(Math.random() * affirmations.length);
  const Component = animations[whichOne];
  const affirmationText = affirmations[whichAffirmation];

  return (
    <View style={[styles.answerOverlay, style]}>
      <View style={styles.answerTextBackground}>
        <MonoText style={styles.answerText}>{affirmationText}</MonoText>
      </View>
      <Component onAnimationFinish={onAnimationFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  answerOverlay: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '80%',
  },
  answerTextBackground: {
    backgroundColor: 'rgba(234,221,255,0.3)',
    padding: 10,
  },
  answerText: {
    textAlign: 'center',
    fontSize: 38,
    color: '#B3261E',
    fontWeight: 'bold',
  },
});
