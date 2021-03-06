speak = function(text, cb) {
  console.log(SpeechSynthesisUtterance)
  if (!SpeechSynthesisUtterance) return false
  var utterance = new SpeechSynthesisUtterance(text);
  if (!utterance) return false
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1;
  var ended = false
  utterance.onend = function(event) {
      ended = true
      if (cb) cb()
  };  
  Meteor.setTimeout(()=>{
    // https://stackoverflow.com/questions/23483990/speechsynthesis-api-onend-callback-not-working
    console.log("start speak")
    window.speechSynthesis.speak(utterance);},1
  );
  Meteor.setTimeout(function() {
    if (!ended) {
      console.log("should have ended. Trigger callback!")
      cb()
    }
  }, 2 * 500 * text.length); // there is a problem with onEnded, as it seem to fail sometimes. This is a fallback. Superficial assunmption is that that each letter needs somehow less than 500ms to pronounce
}

export default speak