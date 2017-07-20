## TBS(Turn Based Strategy) Game Boilerplate 

A TBS game boilerplate in React.

It use [create-react-app](https://github.com/facebookincubator/create-react-app) for creating the repository. 


#### Structure

1. Use canvas for creating the main game stage.
2. Use react component for all the UI stuff.
3. Use redux to manager all the data (no react-redux), in each component there are :
    *   `actions`: a reference used for firing actions.
    *   `store`: store game data like unit information.
    *   `canvas`: store canvas related data like camera.
4. You can enable devTools by `control + H`, which may be configured with `src/helper/DevTool.js`

#### Quick Start

* `yarn install`
* `yarn start`