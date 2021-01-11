import React, { useEffect, useState } from "react";
import Modal from "../../component/ui/modal/Modal";

const withErrorHandler = (WrapComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    useEffect(() => {
      const requestInterceptor = axios.interceptors.request.use((request) => {
        setError(null);
        return request;
      });

      const responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          setError(error);
          return error;
        }
      );
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error?.message}
        </Modal>
        <WrapComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
