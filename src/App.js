import { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';
import ComfyJS from 'comfy.js';

function DebugHistory({ chat }) {

  const [ items, setItems ] = useState([]);
  const [ url, setUrl ] = useState(null);

  useEffect(() => {
    async function effect() {
      if(!chat) {
        return;
      }

      setItems(items => {
        return [...items, chat];
      });

      const baseUrl = "/media";

      let extensions = [
        '/index.json',
        'mp3',
        'ogg',
        'wav',
      ];

      let isMatched  = false;

      let finalUrl;

      while(!isMatched && extensions.length > 0) {
        const ext = extensions.shift();

        finalUrl = `${baseUrl}/${chat}.${ext}`;

        let rsp;
        try {
          rsp = await fetch(finalUrl, { method: 'HEAD' });
        } catch(e) {
        }

        if(rsp.ok) {
          isMatched = true;
        }
      }

      if(isMatched) {
        console.log(`Match found for command ${chat}`);
        setUrl(finalUrl);
      }

      if(!isMatched) {
        console.log(`No media found for command ${chat}`);
      }
    }

    effect();
  }, [ chat ]);

  return (
    <div>
      <pre>{ JSON.stringify(items, null, 2) }</pre>
    </div>
  );
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const twitchChannel = urlParams.get('twitchChannel');


  const [ chat, setChat ] = useState(null);

  useEffect(() => {
    ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
      setChat(command);
    }
    ComfyJS.onJoin = ( user, self, extra ) => {
      console.log('join', user, self, extra);
    };
    ComfyJS.Init( twitchChannel );
  }, []);

  return (
    <div className="App">
      <DebugHistory chat={chat} />
    </div>
  );
}

export default App;
