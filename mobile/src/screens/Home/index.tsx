import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '@assets/logo-nlw-esports.png';

import { Background, GameCard, GameCardData, Heading } from '@components/index';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardData[]>([]);

  const navigation = useNavigation();

  const handleOpenGaming = ({ id, title, bannerUrl }: GameCardData) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch('http://172.18.0.1:3333/games')
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logoImg} />

        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGaming(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
