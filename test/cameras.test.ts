import {CameraClassParams} from '../src/@types/http-methods';

import EOS from './camera-eos.test';
import WEBCAM from './camera-webcam.test';

const CAMERAS: Record<string, CameraClassParams> = {EOS, WEBCAM};

export default CAMERAS;
