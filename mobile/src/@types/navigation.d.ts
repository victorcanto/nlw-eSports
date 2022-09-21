export interface GameParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export type RootStackParamList = {
  home: undefined;
  game: GameParams;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
