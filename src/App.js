import React, { useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";
import axios from 'axios';
/*
1. Paste your App ID into index.js (get it from https://api.speechly.com/dashboard/)
2. Run `npm start` to run the app in development mode
3. Open http://localhost:3000 and you should see your app running
4. Open the Developer Console to see speech segement outputs.
5. Start developing with Speechly (see https://docs.speechly.com/quick-start/)
*/
localStorage.setItem('speechly_sentence.json', JSON.stringify([]));

function App() {
  const { segment } = useSpeechContext()
  const localTime = parseInt(localStorage.getItem("SpeechlyFirstConnect"));
  useEffect(() => {
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ');
      console.log(plainString);
      const cur1 = segment.words[segment.words.length-1];
      cur1.startTimestamp = cur1.startTimestamp + localTime;
      cur1.endTimestamp = cur1.endTimestamp + localTime;
      const inputData = {
         userid: 'demo-speech',
         datetime: new Date().toISOString(),
         datastring: JSON.stringify(cur1),
      };
      
      axios.post(`https://54.227.44.180:8000/api/todos`, { inputData })
        .then(res => {
          console.log(res);
          console.log(res.data);
      })
      const saved1 = localStorage.getItem("speechly_sentence.json");
      const saved2 = JSON.parse(saved1);
      if (cur1?.index != saved2[saved2.length-1]?.index) {
        saved2.push(cur1);
      }
      //localStorage.setItem('speechly_sentence.json', JSON.stringify(saved2));
      if (segment.isFinal) {
        console.log("✅", plainString);
      }
    }
  }, [segment]);

  return (
    <div className="App">
      <BigTranscript placement="top"/>
      <PushToTalkButton placement="bottom" captureKey=" " powerOn="auto" />
      <IntroPopup />
    </div>
  );
}

export default App;
