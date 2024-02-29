1. What is the difference between Component and PureComponent? give an
   example where it might break my app.

   > The difference is that PureComponent implements the shouldComponentUpdate() method, where it makes a shallow comparison between the previous and next state and props. This can break the application in case PureComponent is not updated, then the subtree will not be updated either.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
   that?

   > It's dangerous because child component that relies on context and is wrapped with component that returns false from ShouldComponentUpdate will be not updated when context changes.

3. Describe 3 ways to pass information from a component to its PARENT.

   > 1. Parent can pass a function (callback) through props to a child, then child can call that function and pass data as parameter.
   > 2. We could pass information through Context (e.g. change state of Context provider), then all components (might be parent, child or sibling) that relies on that context will receive the change.
   > 3. I don't know.

4. Give 2 ways to prevent components from re-rendering.

   > 1. React.memo
   > 2. We could use useRef instead of useState

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

   > Fragments are helpful when we need to return many siblings from a component but we don't want to create a DOM node that could e.g. break styling if we are using flexbox. I don't recall any scenario where fragment might break the app.

6. Give 3 examples of the HOC pattern.

   > 1. Passing additional information to a component (eg. withTheme from styled-components or withRouter from react-router).
   > 2. Extract some logic that might be used in many components.
   > 3. I don't know.

7. what's the difference in handling exceptions in promises, callbacks and
   async...await.

   > Handling exceptions in promises and async/await is similar (async/await is syntax sugar for promises) and can be done using `.catch()` or `try {} catch {}`. Catch method handles exceptions that occur in any promise in the promise chain. Try/catch works in the same way - whatever is thrown in try block, will be caught in catch block. When working with callbacks we usually pass two arguments to the callback function and check inside if error is defined e.g. (from node.js docs)

   ```js
   fs.readFile("/Users/joe/test.txt", "utf8", (err, data) => {
     if (err) {
       console.error(err);
       return;
     }
     console.log(data);
   });
   ```

8. How many arguments does setState take and why is it async.

   > setState takes 2 arguments: next state (or function that returns it) and callback that is called after update. It's async because React might batch more updates for better performance.

9. List the steps needed to migrate a Class to Function Component.

   > 1. Make sure your component logic is covered with unit test.
   > 2. Check wether you can replace all lifecycle methods with hooks.
   > 3. Pay attention to edge-cases like Pure Components (can be replaced with React.memo).
   > 4. After refactor check if unit tests are still passing and if there are no visual differences in the component.

10. List a few ways styles can be used with components.

    > CSS in JS solutions like styled-components, CSS modules, inline styles.

11. How to render an HTML string coming from the server.

    > ReactDOM.hydrate() or dangerouslySetInnerHTML.
