import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Game, Home } from '@screens/index';
import { RootStackParamList } from '@globalTypes/navigation';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='game' component={Game} />
    </Navigator>
  );
}
