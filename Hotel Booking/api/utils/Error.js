// this is just an error file when ever we want to read what error is in our file occur we can 
// basically get to know that where is these error comes from  

export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
  };