export const sortArray = (array, key, order) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }

  //fuction to check for null,undefined od ""
  const isNullUndefinedOdEmpty = (value) => {
    return value === null || value === undefined || value === '';
  };

  //define compare function
  const compareFunction = (a, b) => {
    let valA = a[key];
    let valB = b[key];

    if (isNullUndefinedOdEmpty(valA) && isNullUndefinedOdEmpty(valB)) {
      return 0;
    }
    if (isNullUndefinedOdEmpty(valA)) {
      return order === 'asc' ? 1 : -1;
    }
    if (isNullUndefinedOdEmpty(valB)) {
      return order === 'asc' ? -1 : 1;
    }

    if (
      // NUMBER
      !isNaN(valA) &&
      !isNaN(parseFloat(valA)) &&
      !isNaN(valB) &&
      !isNaN(parseFloat(valB))
    ) {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      //STRING
      valA = String(valA).toLocaleLowerCase();
      valB = String(valB).toLocaleLowerCase();
    }

    //COMPARE
    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  };

  return [...array].sort(compareFunction);
};
