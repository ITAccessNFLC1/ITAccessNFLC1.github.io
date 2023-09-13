// BEGIN JavaScript code. -> 'Java script code extension'
window.nfbe = new class {
  constructor() {
    this.TAG = "@@@ FakeAudioContext @@@: ";
    this.mAudioPlayer = new Audio;
  }
  get audioPlayer() {
    return this.mAudioPlayer;
  }
  playAudio(destination) {
    nfbe.logd("playAudio('" + String(destination) + "','"
        + String(destination.stream) + "')");
    //this.mAudioPlayer.pause();
    this.mAudioPlayer.srcObject = destination.stream;
    this.mAudioPlayer.play()
    .then(() => {
      nfbe.logd("calling play() resolved O.");
    })
    .catch((err) => {
      nfbe.logd("calling play() rejected X: " + err);
    });
  }
  logd(msg) {
    console.log(this.TAG + msg);
  }
}
window.AudioContextOrig = window.AudioContext;
window.AudioContext = class NFBEAudioContext extends window.AudioContextOrig {
  constructor(audioSinkOptionsOrSinkId) {
    super();
    this.fakeDestination = this.createMediaStreamDestination();
    nfbe.logd("constructor(" + String(audioSinkOptionsOrSinkId) + ")");
    this.sink_id = audioSinkOptionsOrSinkId;
    if (this.sink_id === undefined ||
        this.sink_id === null) {
      this.sink_id = "";
    }
  }
  setSinkId(audioSinkOptionsOrSinkId) {
    nfbe.logd("setSinkId(" + String(audioSinkOptionsOrSinkId) + ")");
    this.sink_id = audioSinkOptionsOrSinkId;
    return new Promise((resolve, reject) => {
      nfbe.logd("Fake setSinkId(" + String(this.sink_id) + ") calling.");
      nfbe.audioPlayer.setSinkId(this.sink_id)
      .then(() => {
        nfbe.playAudio(this.fakeDestination);
        nfbe.logd("Fake setSinkId(" + String(this.sink_id) + ") resolved O.");
        resolve({});
      })
      .catch(() => {
        nfbe.logd("Fake setSinkId(" + String(this.sink_id) + ") rejected X.");
        reject({});
      });
    });
  }
  get sinkId() {
    nfbe.logd("sinkId='" + String(this.sink_id) + "'");
    return this.sink_id;
  }
  get destination() {
    nfbe.logd("destination: destination='" + String(this.fakeDestination) + "'");
    nfbe.playAudio(this.fakeDestination);
    return this.fakeDestination;
  }
  createMediaStreamSource(stream) {
    nfbe.logd("createMediaStreamSource(" + String(stream) + ")");
    return super.createMediaStreamSource(stream);
  }
  get sampleRate() {
    nfbe.logd("sampleRate='" + String(super.sampleRate) + "'");
    return super.sampleRate;
  }
  decodeAudioData(arrayBuffer) {
    return new Promise((resolve, reject) => {
      nfbe.logd("Fake decodeAudioData(" + String(arrayBuffer) + ") calling.");
      super.decodeAudioData(arrayBuffer)
      .then((decodedData) => {
        nfbe.logd("Fake decodeAudioData(" + String(decodedData) + ") resolved O.");
        resolve(decodedData);
      })
      .catch((ex) => {
        nfbe.logd("Fake decodeAudioData(" + String(ex) + ") rejected X.");
        reject(ex);
      });
    });
  }
}
// END   JavaScript code. -> 'Java script code extension'
