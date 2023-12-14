import pluralize from 'pluralize';

export const searchIdInDataTabs = (dataArray, targetId) => {
  let foundObject = null;

  dataArray.forEach((item) => {
    if (!foundObject) {
      if (Array.isArray(item.data)) {
        const obj = item.data.find((obj) => obj.id === targetId);
        if (obj) {
          foundObject = {
            title: pluralize.singular(item.title),
            id: obj.id,
            obj,
          };
        }
      } else if (typeof item.data === 'object' && item.data !== null) {
        if (item.data.id === targetId) {
          foundObject = {
            title: pluralize.singular(item.title),
            id: item.data.id,
            obj: item.data,
          };
        }
      }
    }
  });
  if (foundObject) {
    return foundObject;
  } else {
    return null;
  }
};
