export class Character {
  id: number;
  description: string;
  name: string;
  thumbnail: string;
  comics: {name: string, resourceURI: string}[];
  public isFav: boolean;
}
