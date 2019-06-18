import store from './store'

export default (to, from, next) => {
      store.state.workLists = []
    next()
  
}