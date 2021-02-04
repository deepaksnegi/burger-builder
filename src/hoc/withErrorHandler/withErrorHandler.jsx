import React from "react";

import Modal from "../../components/ui/modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const WithErrorHandler = (WrappedComponent, axios) => {
  const [error, clearError] = useHttpErrorHandler(axios);
  return (props) => {
    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default WithErrorHandler;
