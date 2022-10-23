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

function App() {
  const { segment } = useSpeechContext()
  useEffect(() => {
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ');
      console.log(plainString);
      const d1 = new Date();
      const time1 = d1.getTime();
      const cur1 = segment.words[segment.words.length-1];
      const cur2 = {time1:cur1};
      localStorage.setItem('speechly_current.json', JSON.stringify(cur2));
      if (segment.isFinal) {
        console.log("✅", plainString);
        const saved = localStorage.getItem("speechly_sentence.json");
        const saved2 = JSON.parse(saved);
        const d2 = new Date();
        const time2 = d2.getTime();
        const saved3 = plainString;
        const saved4 = {time2:saved3}
        const saved5 = {...saved2, ...saved4};
        localStorage.setItem('speechly_sentence.json', JSON.stringify(saved5));
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
