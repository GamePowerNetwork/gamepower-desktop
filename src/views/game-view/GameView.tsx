import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createMenuBar } from '../../application/actions/ui';
import './GameView.css';

import Unity, { UnityContext } from "react-unity-webgl";


const unityContext = new UnityContext({
    loaderUrl: "http://localhost:3182/build/WebGL.loader.js",
    dataUrl: "http://localhost:3182/build/WebGL.data",
    frameworkUrl: "http://localhost:3182/build/WebGL.framework.js",
    codeUrl: "http://localhost:3182/build/WebGL.wasm",
  });
  

function GameView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createMenuBar);
  }, [dispatch]);


  return (
    <div className="GameView">
        <Unity unityContext={unityContext} height="100%" width="100%" />
    </div>
  );
}

export default GameView;
