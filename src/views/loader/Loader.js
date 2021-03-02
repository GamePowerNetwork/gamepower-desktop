import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getKeyringInitialized } from '../../application/selectors/keyring';
import { getLoading, getLoadingMessage } from '../../application/selectors/ui';
import './Loader.css';


function Loader() {
    const history = useHistory();
    const loading = useSelector(getLoading);
    const loadingMessage = useSelector(getLoadingMessage);
    const isKeyringInitialized = useSelector(getKeyringInitialized);

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
