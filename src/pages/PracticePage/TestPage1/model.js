let middleware1 = _ref => next => action => {
    console.log('middleware1执行了')
    next(action)
}

let middleware2 = _ref => next => action => {
    console.log('middleware1执行了')
    next(action)
}

let middleware3 = _ref => next => action => {
    console.log('middleware1执行了')
    next(action)
}

