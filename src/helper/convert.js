export default function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    console.log("fileReader", fileReader);
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
      console.log("fileresult", fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
      console.log("error", error);
    };
  });
}
