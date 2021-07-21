## Getting started

Before install module, please check pnpm installed or you can run code below to install pnpm globally.

```bash
> npm install -g pnpm
```

The stack is built using [vue-cli webpack](https://github.com/vuejs-templates/webpack) so to get started all you have to do is:

```bash
# install dependencies
> pnpm install
# serve with hot reload at localhost:8080
> pnpm serve
```

## Dockerizing

If you want to running inside docker you can run with these command:

```bash
# login to your docker hub
> docker login
# build vue app
> docker build -t test-op .
# run your container go to localhost:8080
> docker run -it -p 8080:80 --rm --name dockerize-test-op test-op
```

## To know

Current arbitrary choices are:

- Vuex modules for store
- Vue-axios for ajax requests
- BootstrapVue for bundling components
- VeeValidate for validation that combined with botstrap vue
- VueRouter for routing

I try to create robust coding ehere implementing concept seperation of concerns:

- pages => this folder contains gateway for route every route will linked with pages component
- store => state management and responsible for getting call services to getting data from API
- services => method for getting data from API
- components => reusable component
