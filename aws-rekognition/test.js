const data = [
  {
    DetectedText: 'April',
  },
  {
    DetectedText: 'Ganzo.galaxy@gmail.com',
  },
];

const matched = data.filter((email) => email.DetectedText.includes('@'))[0]
  .DetectedText;
console.log(matched);
