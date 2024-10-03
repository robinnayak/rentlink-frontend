export const handleApiError = (error) => {
    let errorMessage = "An unexpected error has occurred"; // Default error message
  
    if (error) {
      // Handle network or other general errors (e.g., no response from the server)
      if (error.message) {
        errorMessage = error.message;
      }
  
      // Check if we have an error response from the API
      if (error.response) {
        const { status, data } = error.response;
  
        // Handle specific HTTP status codes
        switch (status) {
          case 400:
            errorMessage = "Bad Request. Please check your input.";
            break;
          case 401:
            errorMessage = "Unauthorized. Please log in again.";
            break;
          case 403:
            errorMessage = "Forbidden. You do not have permission to access this resource.";
            break;
          case 404:
            errorMessage = "Resource not found. The requested data could not be found.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = `Error ${status}: Something went wrong.`;
        }
  
        // Check for specific error data in the response (e.g., validation errors)
        if (data) {
          // Handle general non-field errors
          if (data.non_field_errors) {
            errorMessage = data.non_field_errors[0];
          }
  
          // Handle field-specific errors
          if (data.email) {
            errorMessage = `Email error: ${data.email[0]}`;
          }
          if (data.password) {
            errorMessage = `Password error: ${data.password[0]}`;
          }
  
          // Handle other validation or detailed error messages
          if (data.detail) {
            errorMessage = data.detail;
          }
  
          // Handle other custom error messages returned from the API
          if (data.message) {
            errorMessage = data.message;
          }
        }
      }
    }
    return errorMessage;
  };
  