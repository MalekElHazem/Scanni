export type Data = {
  id: number;
  image: any;
  title: string;
  text: string;
};

export const data: Data[] = [
  {
    id: 1,
    image: require('../assets/image1.png'),
    title: 'Biometric Authentication',
    text: 'a cybersecurity process that verifies a user s identity using their unique biological traits such as fingerprints, voices, retinas, and facial features',
  },
  {
    id: 2,
    image: require('../assets/image2.png'),
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    image: require('../assets/image3.png'),
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];