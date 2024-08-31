import { View, Text, FlatList, Pressable, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

import { GalleryPreviewData } from '@/interfaces/affirmation-category';
import { BASE_URL } from '@/config/axios';

interface GuidedAffirmationsGalleryProps {
  title: string;
  previews: GalleryPreviewData[];
}

const GuidedAffirmationsGallery = ({
  previews,
  title,
}: GuidedAffirmationsGalleryProps) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-xl font-bold text-white">{title}</Text>
      </View>
      <View className="space-y-2">
        <FlatList
          data={previews}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/affirmations/${item.id}`} asChild>
              <Pressable>
                <View className="w-32 mr-4 rounded-md h-36">
                  <Image
                    source={{
                      uri: `${BASE_URL}/${item.image}`,
                    }}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                  <Text>ProductGallery</Text>
                </View>
              </Pressable>
            </Link>
          )}
          horizontal
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationsGallery;
