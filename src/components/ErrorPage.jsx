import React from 'react'

export default function ErrorPage() {
    let errorMessage = '';

    if (errorCode === 400) {
      errorMessage = 'Error 400: Bad Request';
    } else if (errorCode === 404) {
      errorMessage = 'Error 404: Not Found';
    } else {
      errorMessage = 'Unknown Error';
    }
  
    return (
      <div>
        <h1>ErrorPage</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }