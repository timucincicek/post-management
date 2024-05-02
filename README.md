# Post Management

Post Management is a small application that receives 100 posts from the jsonplaceholder API and displays them in a 10 x 10 grid with 100 boxes.

Each post has the following properties: userId, id, title, and body. By default, each square in the grid displays the 'title' property. However, clicking on posts changes the displayed property one by one.

If the displayed property of a post changes and clicking on another box attempted previously, the changed displayed property of the post turns back to the default 'title' property.

To approach this problem, a parent component receives a list of posts and passes each post instance to a child component, which is powered by ngRx for state management.

Details of this project and the reasons for choosing the listed approaches are provided.

# Project Construction

The project has been constructed using the latest versions of npm packages and Angular utilities [Based on Angular 17], following best, commonly used practices.

# Installation

Once the project is cloned, it is only enough to run `npm install` to install the required npm packages. Then, running `ng serve` starts running the project.

*[Assuming Node.js and Angular CLI are already installed.]*

## List of Added NPM Packages

Below you will find a list of npm packages installed in the project with the versions and purpose to be able to operate some actions in the project. [All those are up-to-date in the date and time they have been initialized].

- **@ngrx/effects** and **@ngrx/store** [ver 17.2.0] - For state management.
- **bootstrap** [ver 5.3.3] - For styling.
- **jasmine-marbles** - For testing ngrx effects to simulate actions.
- **ngx-toastr** [ver 18.0.0] - For showing toast messages.

## Project Structure

### Folders

![IMG]

- **Components**:

  - Four components have been generated apart from the app component to serve general purposes. A standalone approach was followed for creating components to avoid worrying about any kind of module and dependencies to the module.
  - To use built-in directives, pipes, and other utilities in Angular instead of CommonModule, each member of this module has been imported individually to avoid including unused imports from CommonModule.
  - AsyncPipe has been used in the template to subscribe to observables and consume their values, avoiding the need for unsubscribing in ngOnDestroy with an extra added Subscription value attached to it.
  - HTML templates are stored in the template property of the component scope in .ts file for components that do not need SCSS to reduce unnecessary crowding.
  - Components' injections are made with the readonly keyword in the constructor to provide immutability.
  - Types are used extensively throughout the codebase to ensure type safety.
  - Constructors are mostly used for the assignments of store observables to avoid unnecessary imports and usage of ngOnInit hook.

1. **Header**: 
   - Bootstrap navbar has been used with a black background. On the left side, 'Post Management' is hardcoded as the name of the app. On the right side, the currently clicked post appears with its id conditionally. As soon as a box is clicked, the observable of selected store streams the clicked post instance. Otherwise, it's empty.

   ![IMG]

2. **Loading Spinner**: 
   - A custom loading spinner is used to give the idea that posts are loading. The activity of toggling is managed in the state and used in the app component.

   ![IMG]

3. **Post List**: 
   - A list of 100 posts is fetched with the dispatched 'fetchPosts' action from the actions to send a request to the API. Once posts are received from the getExtendedPosts$ observable, they are passed to the app-post component to be shown in the grid one by one. PostList component updates related child app-post components correctly with the help of actions. Display grid is used to manage the 10 x 10 layout.

   ![IMG]

4. **Post**: 
   - Component post manages click to the post and dispatches the action onPostClick with the clicked post object passed via input property from the post list component. An array called arrayOfPostProperties is extracted from a Post enum to access each property of the post with numbers.

   ![IMG]

5. **App Component**: 
   - App component holds always active components in the lifetime of the application, including header, post-list, and loading-spinner components. App component selects selectLoading from store to be able to subscribe to the changes of loading toggle activity.

   ![IMG]

- **Enums**: 
  - Only one exported enum is used and stored in the folder enums to target properties of the object 'Post' with the numbers to select with the corresponding indexes matching in the properties array.

- **Models**: 
  - Three exported interfaces are used and stored under the models directory to assign the type of objects, arrays, etc. Post is the interface based on the object that we are fetching posts from the API. ExtendedPost is an interface that extends Post with additional activeState and index. StoreDTO is a general definition of how stores look like to avoid duplicating types.

- **Services**: 
  - Only one ApiService is used in the entire application to fetch posts from the API. A getter baseUrl is used to access the jsonplaceholder API path inside the function getPosts to fetch a list of posts using get from HttpClient as an observable.

- **Store**: 
  - The store folder mainly includes everything related to store for state management, including actions, effects, reducers, and selectors, combined in a folder.

- **Styles**: 
  - For commonly used SCSS variables, _colors.scss is created. If the application were bigger, other utilities such as mixins, operators, functions, etc., would be included.

- **Unit-tests**: 
  - Mock datasets are stored in separate folders to be imported into unit test files.

- **Environment**: 
  - Folder environment holds the file environment.ts, which includes the apiUrl where jsonplaceholder API is stored as a string to be accessed from ApiService.

# State Management

![IMG]

- The latest version of ngRx has been used in this project with the modern functional paradigm (createReducer, createAction, createEffect, etc.).
- There are 4 reducers used and defined in the store in main.ts.
- Flow will be explained starting from actions since they are used in reducers to update the state or create side effects using effects when dispatched.
- Immutability is crucial in state management; spread operators are used most of the time to clone and return a new state with manipulation.
- All variables holding an observable include a '$' dollar sign at the end of the variable name to adhere to the common convention.

## Reducers

### extendedPostListReducer:
- Manages the whole posts state by defining extendedPostList with attached activeState and index properties. 
- Attached setExtendedPostList directly sets the received list of extended posts to the state, updateExtendedPost updates any received post object with a received index and activeProperty to update extendedPostListState.

![IMG]

### previousPostReducer:
- Stores and manipulates the previously manipulated active property of the post. 
- The previous post reducer should be stored in the state and manipulated with the setPreviousPost attached to the previousPostState.

![IMG]

### activePostReducer:
- Stores the active post of any box on each click. 
- The currently clicked post should be stored in the activePostState to be manipulated on each dispatched onPostClickAction.

![IMG]

### loadingReducer:
- Manages the activity of loading toggle. 
- loadingReducer is used to manipulate loadingState with the dispatched setLoadingAction.

![IMG]

## Actions

### fetchPosts:
- An action triggered in the setExtendedPostsEffect to send a request to the API to fetch posts and create a side effect.

![IMG]

### setExtendedPostList:
- Sets the list of extended posts once posts are fetched from the API. 
- Takes a list of ExtendedPost as a parameter.

![IMG]

### updateExtendedPost:
- Manipulates any ExtendedPost with a changed title. 
- Takes an ExtendedPost object as a parameter.

![IMG]

### onPostClick:
- Sets any ExtendedPost on each click. 
- Takes an ExtendedPost object as a parameter.

![IMG]

### setPreviousPost:
- Sets the previous post to be dispatched in the onPostClickEffect once the actively clicked box has changed.

![IMG]

### setLoading:
- Sets loadingState with the value true or false attached to loadingReducer.

![IMG]

## Effects

![IMG]

### setExtendedPostsEffect:
1. Once the action fetchPosts is dispatched, the loading toggle is activated with the dispatched setLoading to wait until the API has returned successfully.
2. Thanks to switchMap, the observable from apiService is switched to subscribe to fetch the list of posts.
3. Once the observable has been completed, the response of posts array is mapped to return extendedPostItems with attached activeState and index. A success message is displayed by calling success from the toastr service. In the end of the map operator, setExtendedPostList is returned to be dispatched with extendedPostItems array.
4. Error handling is provided using catchError to print error messages via toastr without breaking observable chains.
5. Either response ended successfully or failed to inactive loading toggle, setLoading action is dispatched within the tap operator.

![IMG]

### onPostClickEffect:
1. Once onPostClick is dispatched, the previousPost state from store is selected with withLatestFrom operator to be compared with clickedPost action.
2. With destruction applied in the tap operator to be able to get the values of previous and active post objects. Since clicking a box always should change the displayed property, action updateExtendedPost should always be dispatched with the manipulated activeState value.
3. The manipulation of activeState is basically incremented by one and calculated the mod of 4. So it would always be repeated from 0 to 3 one by one. Using these numbers, property names can be accessed with the corresponding index correctly.
4. On each mouse click, it should be checked if a new post is being clicked. In case it does, the activeState property of the previously stored post should change to title as a default.
5. To be able to change the previousPost, the action setPreviousPost should be dispatched if the condition matches.
