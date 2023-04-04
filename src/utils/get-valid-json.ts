export const getValidJSON = async (data: string) => {
  try {
    const parsedData = JSON.parse(data);
    return typeof parsedData === 'object' && parsedData !== null && parsedData;
  } catch (e) {
    return false;
  }
};
