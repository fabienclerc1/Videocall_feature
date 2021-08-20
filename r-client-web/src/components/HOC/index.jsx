const WithAuthentication = (WrapperComponent) => (props) => {
    //redirect to login page if token is not stored
    const token = sessionStorage.getItem('token');
    if (token) {
        return <WrapperComponent />;
    } else {
        props.history.push("/");
        return null;
    }
};

export default WithAuthentication;