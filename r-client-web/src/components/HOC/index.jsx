const WithAuthentication = (WrapperComponent) => (props) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        return <WrapperComponent />;
    } else {
        props.history.push("/");
        return null;
    }
};

export default WithAuthentication;