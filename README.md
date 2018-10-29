##Eastern Passenger
A React-Native app to request taxis from [Eastern Car Service](https://www.easterncarservice.com/).

##Installation
First off, `git clone` && `npm install`.

If you don't yet have React-Native, follow [these instructions](https://facebook.github.io/react-native/docs/getting-started.html) to get yourself set up.

If this is your first time running the app, you will need XCode to build and compile it. XCode might give you a new terminal instance with the file watcher running. If this bothers you, you can run `react-native start` in your terminal of choice.

If you are experiencing MapBox issues, try running through [these steps](https://github.com/mapbox/react-native-mapbox-gl/blob/master/ios/install.md) on your local build.

##Using the app
Eastern's car dispatcher is located [here](http://easterncarservice.com/cerebro_test/dispatcher.php). You can log in with username: `rehash` and password: `#rehash`.

If you request a ride from the app, you will see that ride's job number large and beautiful in the console. Input this into the dispatcher (you can usually find it under 'Old Jobs') to assign a driver.

If you don't need a driver, you can just enter params into the following:
https://www.easterncarservice.com/api/v2/passenger/status.php?job={{jobNum}}&status={{status}} ,
where `jobNum` and `status` are the respective values.

Alternatively, you can download [this](https://drive.google.com/open?id=0B3ruJRAbkwN1QU1rbHZ3RFRJQmc) and easily make GET requests to the server from your browser. There's a warning about a chrome extension in there but it turns out it's not important.

##Structure
The app is built using React-Native and Redux. If you've never used Redux before, [this might help](http://redux.js.org/docs/basics/index.html). In short, the entire app state is held in one large object, and all the components in the app edit and reference this state instead of creating their own (ideally).

###Flow
When you request a ride, the app starts polling Eastern's API for updated information on the driver. The API docs are located [here](https://www.dropbox.com/sh/b2fndf42njcn7th/AAClVfw2nkuMfLGTTgO4Vqj-a?dl=0). Each time a request is fulfilled, the Redux state is updated with the current ride information.

When a ride is complete, the polling stops.

###Navigation
Each time you move from state to the other, a Redux action is dispatched, causing the next state to be added to a stack of states. As you navigate, this stack is pushed and pulled from.

Every state has its own `container` and `component` which you will find in the `containers` and `components` directory, respectively. The states are indexed in `routes.js`, and can thus be referenced by name if you want to `navigateTo` somewhere.

###Async
Some actions need to talk to the API and are asynchronous in nature. Most of these are attached to a `thunk`, which will call off a series of actions. If you need to trigger an async action from within a component, you should call the corresponding `thunk` function.

###Login
There are two test users in the system right now. If you go to `reducers/user.js:44` you can find an easy way to switch between them. Ben Neiswander is a sample voucher account and Joe King is a sample regular account.

###Note when upgrading react-native
You need to manually delete the mapbox framework from ios/ and add the new run script phase manually from the [installation guide](https://github.com/mapbox/react-native-mapbox-gl/blob/master/ios/install.md). You also need to remember to revert the info.plst to allow the insecure server connection. See the git history of the file.
