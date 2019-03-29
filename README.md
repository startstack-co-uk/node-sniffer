# simple-request-tracker

**imple-request-tracker** is a minimal package for keeping records of your API calls and gives simple analytics about them.
It provides a rather simple initialization process and uses the concept of [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html) to keep **track*** of requests you specify by storing them on a [SQLite](https://www.sqlite.org/index.html) file.



## Types of analytics
- Total number of requests tracked
- Total number of requests by method type
- Total number of requests by route
- Total number of requests for specific path with specific method


## Installing


## Usage

    import { tracker } from 'simple-request-tracker'

## Setting up
    initialize(__dirname +  '/data.sqlite', app.getHttpAdapter().getInstance()); // for NestJS

The first argument is the path were your database will be created and the second the http adapter instance.

    initialize(__dirname +  '/data.sqlite', app); // for ExpressJs

## Tracking a route

    import { tracker } from 'simple-request-tracker'
    
    @Get()
    async  getHello(@tracker() track):  Promise<string> {
    	return  this.appService.getHello();
    }

Just import **tracker*** from **simple-request-tracker** and give it as a parameter to the route handler. Don't forget the **@** sign before the tracker method, which signifies that this is a decorator method.

## API

- initialize( path, httpAdapter)
	> Is used to inisiate the mapping process for the available routes. The **path** parameter is the location to create the sqlite database file. The **httpAdapter** parameter is the instance of the routing adapter.
- tracker()
	> An http parameter function that catches the request on the specified path and passes it down to increment the request count on that route.
- getAllRequests()
	> Returns an object with key **total**, which is the total number of requests tracked
- getRequestsPerMethod()
	> Returns an array of objects , where each object has a **method** key ('GET', 'POST', etc.) and a **count** key that represents the total requests tracked with that method.
- getRequestsPerPath()
	> Returns an array of objects, where each object has a **path** key  for the path tracked and a **count** key that represents the total requests tracked for that path
- getTotalPerPathMethodCombo()
	> Returns an array of objects containing a **path** key for the path tracked , a **method** key for the method of that path and a **count** key for the number of requests with the corresponding path tracked.


## Future features
- Getting time based anlytics ( daily, weekly, monthly, yearly)
- Adding test cases


## Contributors
- [Ergi Bërdëllima](https://github.com/Bhfreagra) 
- [Valdio Veliu](https://github.com/valdio)


## License MIT

```
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
