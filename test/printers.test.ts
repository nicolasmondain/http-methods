import {EventEnginePrinter} from '../src/@types/event-engine';

import DNP from './printer-dnp.test';

const PRINTERS: Record<string, EventEnginePrinter> = {DNP};

export default PRINTERS;
