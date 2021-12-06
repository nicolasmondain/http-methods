import {mediaStream} from '../src/@types/event-engine/mediaStream';

import EOS from './camera-eos.test';
import WEBCAM from './camera-webcam.test';

const CAMERAS: Record<string, mediaStream> = {EOS, WEBCAM};

export default CAMERAS;
