import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';

export const downloadFile = async url => {
  const {config, fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  const filename = url.split('/').pop();
  const imagePath = `${cacheDir}/${filename}`;

  try {
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
      },
      android: {
        fileCache: true,
        path: imagePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: imagePath,
          description: 'File',
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
