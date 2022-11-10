const LocalStorageService = (function(){
    let service;

    function getService() {
        if(!service) {
            service = this;

            return service
        }
        return service
    }

    function setToken(tokenObj) {
        localStorage.setItem('accessToken', tokenObj.accessToken);
        localStorage.setItem('refreshToken', tokenObj.refreshToken);
    }

    function getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    function getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    function clearToken() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
    function removeAccessToken() {
        localStorage.removeItem('accessToken');
    }

    return {
        getService : getService,
        setToken : setToken,
        getAccessToken : getAccessToken,
        getRefreshToken : getRefreshToken,
        clearToken : clearToken,
        removeAccessToken: removeAccessToken
    }
})();

export default LocalStorageService;