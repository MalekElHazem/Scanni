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
    text: 'To access the application you will need to login with Biometric Authentication if available, this process verifies you\'re identity using your unique biological traits such as fingerprints and facial features.',
  },
  {
    id: 2,
    image: require('../assets/image2.png'),
    title: 'Scan Qr Code',
    text: 'Scanni allow you to scan qr codes either from your camera or  from gallery, the app allow you to scan from the back and front camera you can use your flash too.',
  },
  {
    id: 3,
    image: require('../assets/image3.png'),
    title: 'Generate Qr Code',
    text: 'scanni allow you to generate qr codes either a text or a URL, the app then allow you to download the qr code generated to your phone.',
  },
];
