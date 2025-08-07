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
      source={require('../assets/images/right-answers/right-icon.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
   ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-purple-checkmark.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-turtle.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-dinosaur.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-balloons.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-dinosaur-scooter.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-butterfly.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-lion.json')}
      autoPlay
      loop={false}
      speed={2}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-explosion.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-gift.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-firework-star.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-fireworks.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-puppy.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-fox-chair.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/tiger.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
  ({ onAnimationFinish }: ComponentProps) => (
    <LottieView
      source={require('../assets/images/right-answers/right-checkmark.json')}
      autoPlay
      loop={false}
      resizeMode="contain"
      onAnimationFinish={onAnimationFinish}
      style={styles.lottieAnimation}
    />
  ),
];

const affirmations = ['Good Job!', 'Correct!', 'Well Done!', 'Nice!', 'Keep Going!', 'Yep!'];

export default function RightAnswer({ style, onAnimationFinish }: AnimationProps) {
  const whichComponent = Math.floor(Math.random() * animations.length);
  const whichAffirmation = Math.floor(Math.random() * affirmations.length);
  const Component = animations[whichComponent];
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
    color: '#21005D',
    fontWeight: 'bold',
  },
  lottieAnimation: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 200,
  },
});
