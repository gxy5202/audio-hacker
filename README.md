# 🎧audio-hacker
A magical library for controlling audio pitch and volume, based on jungle.js

# Useage
## Initial Audiohacker

```javascript
import Audiohacker from 'audio-hacker';

const audioCtx = new AudioContext();

if (audioCtx.state !== 'running') {
    await audioCtx.resume();
}

const video = document.querySelector('video');

const source = audioCtx.createMediaElementSource(video);

const audioController = new Audiohacker(audioCtx);

audioController.output.connect(audioCtx.destination);

source.connect(v.input);

```

## Update pitch
```javascript

// best step 0.01
audioController.setPitchOffset(0.22);
audioController.setPitchOffset(-0.12);

```

## Update volume
```javascript

// minimum value is 0;
audioController.setVolume(0.3);
audioController.setVolume(3.3);

```

## Disconnect
```javascript

audioController.disconnect();

```
