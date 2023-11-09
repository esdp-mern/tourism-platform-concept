import fs from 'fs';
import https from 'https';

const write_https_image = (
  url: string,
  imagePath: string,
  finishFunction?: () => void,
) => {
  const file = fs.createWriteStream(imagePath);

  https
    .get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        if (finishFunction) {
          finishFunction();
        }
      });
    })
    .on('error', (err) => {
      fs.unlink(imagePath, () => {});
      console.error(`Error downloading image: ${err.message}`);
    });
};

export default write_https_image;
