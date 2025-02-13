# @sharingbox/http-methods

HTTP (JavaScript) methods to communicate with the eventManager by sharingbox servers.
*This package is public but remains intended for internal use (requires the servers of the eventManager by sharingbox application in order to communicate with the hardware).*

## Installation

```
npm install @sharingbox/http-methods --save
```
## Usage

```js
import {Printer, Camera, Photobooth} from '@sharingbox/http-methods';

const printer    = new Printer(PRINTER_SERVER, PRINTER_OPTIONS);
const camera     = new Camera(CAMERA_SERVER, CAMERA_OPTIONS);
const photobooth = new Photobooth(PHOTOBOOTH_SERVER);

await camera.startLiveView();
await camera.shootAndWait(file);
await printer.print(file, 1);

```
## Notes
### Generate class methods from module

```javascript
import {EventEngineGreenscreen, EventEngineMedia, EventEnginePrinter, EventEngineStream} from '../@types/event-engine';
import {httpMethodsModule} from '../@types/http-methods';

export class Hardware {
	options: EventEnginePrinter|EventEngineStream;

	constructor(options: EventEnginePrinter|EventEngineStream, httpMethods: httpMethodsModule){
		this.options = options;
		const list = Object.getOwnPropertyNames(httpMethods).filter((name) => typeof httpMethods[name] === 'function');

		for(let i = 0; i < list.length; i += 1){
			const name:string = list[i];

			this[name] = (...args: Array<string|number|boolean|EventEngineMedia|EventEngineGreenscreen>) => {
				httpMethods[name](this.options, ...args);
			};
		}
	}
}
```
