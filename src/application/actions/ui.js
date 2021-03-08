export const APP_INIT                       = '[ui] app init';
export const SET_LOADING_ON                 = '[ui] set loading on';
export const SET_LOADING_OFF                = '[ui] set loading off';
export const SET_LOADING_MESSAGE            = '[ui] set loading message';
export const CREATE_MENUBAR                 = '[ui] create menubar';

export const appInit = {
    type: APP_INIT
};

export const createMenuBar = {
    type: CREATE_MENUBAR
};

export const setLoading = isLoading => ({
    type: isLoading ? SET_LOADING_ON : SET_LOADING_OFF,
    payload: isLoading,
});

export const setLoadingMessage = loadingMessage => ({
    type: SET_LOADING_MESSAGE,
    payload: loadingMessage,
});