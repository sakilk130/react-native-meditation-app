import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import AppGradient from '@/components/app-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import instance, { BASE_URL } from '@/config/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { MeditationType } from '@/interfaces/meditation';

const NatureMeditateScreen = () => {
  const router = useRouter();
  const [meditations, setMeditations] = useState<MeditationType[]>([]);

  const fetchMeditations = async () => {
    try {
      const response = await instance.get(API_ENDPOINTS.GET_MEDITATIONS);
      if (response.data?.status === 200) {
        setMeditations(response.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeditations();
  }, []);

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
            data={meditations}
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
                  source={{
                    uri: `${BASE_URL}/${item.image}`,
                  }}
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
