import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {BUTTONS} from './constants/buttonValues';
import {countResult} from './helpers/helpers';

export const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const [screenValue, setScreenValue] = useState('');
  const [result, setResult] = useState(null);

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }),
    [isDarkMode],
  );
  const containerBackgroundColor = useMemo(
    () => ({
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    }),
    [isDarkMode],
  );

  const pressHandler = async (value: string) => {
    if (value === BUTTONS.backspace) {
      const newValue = screenValue.slice(0, -1);
      screenValue.length === 1 ? setScreenValue('') : setScreenValue(newValue);
      setResult(await countResult(newValue));
      return Promise.resolve();
    }

    if (
      value === BUTTONS.plus &&
      screenValue[screenValue.length - 1] === BUTTONS.plus
    ) {
      return;
    }

    if (value === BUTTONS.equal) {
      setScreenValue(await countResult(screenValue));
      setResult(null);
      return;
    }

    const newValue = screenValue + value;
    setScreenValue(newValue);

    setResult(await countResult(newValue));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <Header />
        <View style={[containerBackgroundColor, styles.container]}>
          <Text>Look mom, it's app with new arch!</Text>
          <View style={styles.screen}>
            <Text style={styles.screenText}>{screenValue || '0'}</Text>
            <Text style={styles.screenText}>{result}</Text>
          </View>
          <View style={styles.buttonsBox}>
            {Object.values(BUTTONS).map((item, i) => (
              <TouchableOpacity
                key={item + i}
                style={styles.button}
                onPress={() => pressHandler(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 550,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
  },
  screen: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  screenText: {
    fontSize: 25,
  },
  buttonsBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '23%',
    height: '23%',
    margin: 3,
    borderWidth: 1,
    borderRadius: 40,
  },
});
