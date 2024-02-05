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
    text: 'A cybersecurity process that verifies a user s identity using their unique biological traits such as fingerprints, voices, retinas, and facial features',
  },
  {
    id: 2,
    image: require('../assets/image2.jpg'),
    title: 'Scan Qr Code',
    text: 'Scanni allow you to scan qr codes either from your camera or  from gallery, the app allow you to scan from the back and front camera you can use the flash too.',
  },
  {
    id: 3,
    image: require('../assets/image3.png'),
    title: 'Generate Qr Code',
    text: 'scanni allow you to generate qr codes either a text or a URL, the app then allow you to download the qr code generated to your phone.',
  },
];
