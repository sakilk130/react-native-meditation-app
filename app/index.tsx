import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import beachImage from '@/assets/meditation-images/beach.webp';
import CustomButton from '@/components/CustomButton';

const App = () => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMethod="resize"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
        >
          <SafeAreaView className="flex flex-1 px-1 justify-between">
            <View>
              <Text className="text-center text-4xl text-white font-bold">
                Simple Meditation
              </Text>
              <Text className="text-center text-white font-regular text-2xl mt-3">
                Simplifying Meditation for Everyone
              </Text>
            </View>
            <CustomButton
              onPress={() => router.push('/nature-meditate')}
              title="Get Started"
            />
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
