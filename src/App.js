import React, { useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";

/*
1. Paste your App ID into index.js (get it from https://api.speechly.com/dashboard/)
2. Run `npm start` to run the app in development mode
3. Open http://localhost:3000 and you should see your app running
4. Open the Developer Console to see speech segement outputs.
5. Start developing with Speechly (see https://docs.speechly.com/quick-start/)
*/
const localTime = localstorage.getItem("SpeechlyFirstConnect");

function App() {
  const { segment } = useSpeechContext()
  localStorage.setItem('speechly_sentence.json', JSON.stringify([]));
  useEffect(() => {
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ');
      console.log(plainString);
      const cur1 = segment.words[segment.words.length-1];
      cur1.startTimestamp = cur1.startTimestamp + this.localTime;
      cur1.endTimestamp = cur1.endTimestamp + this.localTime;
      localStorage.setItem('speechly_current.json', JSON.stringify(cur1));
      const saved1 = localStorage.getItem("speechly_sentence.json");
      const saved2 = JSON.parse(saved1);
      saved2.push(cur1);
      localStorage.setItem('speechly_sentence.json', JSON.stringify(saved2));
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
