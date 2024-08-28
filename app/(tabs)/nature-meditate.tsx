import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';

import AppGradient from '@/components/app-gradient';
import { MEDITATION_DATA } from '@/constants/meditation-data';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const NatureMeditateScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
        <View className="mb-6">
          <Text className="text-4xl font-bold text-left text-gray-200">
            Welcome Steven
          </Text>
          <Text className="text-xl font-medium text-indigo-100">
            Start your meditation practice today
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className="mb-20"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/meditate/${item.id}`)}
                className="h-48 my-3 overflow-hidden rounded-md"
              >
                <ImageBackground
                  source={MEDITATION_IMAGES[item.id - 1]}
                  resizeMode="cover"
                  style={styles.backgroundImage}
                >
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                  >
                    <Text className="text-3xl font-bold text-center text-gray-100">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  gradient: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  list: {
    paddingBottom: 150,
  },
});

export default NatureMeditateScreen;
