import {EventEngineStream} from '../src/@types/event-engine';

import EOS from './camera-eos.test';
import WEBCAM from './camera-webcam.test';

const CAMERAS: Record<string, EventEngineStream> = {EOS, WEBCAM};

export default CAMERAS;
