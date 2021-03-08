import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// application
import { appInit } from '../../application/actions/ui';
import { initKeyring } from '../../application/actions/keyring';
import { getKeyringInitialized } from '../../application/selectors/keyring';
import { getLoading, getLoadingMessage } from '../../application/selectors/ui';
import { getProviderConnection } from '../../application/selectors/provider';

import './Loader.css';


function Loader() {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(getLoading);
    const providerConnection = useSelector(getProviderConnection);
    const loadingMessage = useSelector(getLoadingMessage);
    const isKeyringInitialized = useSelector(getKeyringInitialized);

    // Init the app
    useEffect(() => {
        dispatch(appInit);
    }, [dispatch]);

    // Init the keyring once the provider connection is ready
    useEffect(() => {
        if(providerConnection !== null) {
        dispatch(initKeyring);
        }
    }, [dispatch, providerConnection]);

    // Once all loading is done, go to the login screen
    useEffect(() => {
        if(isKeyringInitialized) {
            history.push("/login");
        }
    }, [history, isKeyringInitialized]);



    return (
        <div className="Loader">
            <header className="Loader-header">
            {loading ? <span>{loadingMessage}</span> : 
                ''
            }
            </header>
        </div>
    );
}

export default Loader;
