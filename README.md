# http-methods
HTTP (JavaScript) methods to communicate with the eventManager by sharingbox servers

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
