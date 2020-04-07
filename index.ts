namespace myRedux {
    interface InitState {
        [index: string]: any
    }

    interface Action {
        type: string,
        [index: string]: any
    }

    export function createStore(reducer: (store: InitState, action: Action) => {}, initState: InitState) {
        let store: InitState = initState
        let subscribers: (() => {})[] = []
        function getState() {
            return store
        }
        
        function subscribe(fn: () => {}) {
            subscribers.push(fn)
        }

        function dispatch(action: Action) {
            store = reducer(store, action)
            subscribers.forEach(fn => fn())
        }

        return {
            getState,
            subscribe,
            dispatch
        }
    }
}

interface InitState {
    [index: string]: any
}

interface Action {
    type: string,
    [index: string]: any
}
let data: InitState = {
    name: 'aa',
    age: 18
}

function reducer(state: InitState, action: Action) {
    const { type, data } = action
    switch(type) {
        case 'a':
            return {
                ...state,
                ...data
            }
        default:
            return state
    }
}

let store = myRedux.createStore(reducer, data)

console.log(store.getState())

store.subscribe(() => {
    console.log(555)
    return {}
})

store.dispatch({
    type: 'a',
    data: {
        age: 19,
        sex: 'man'
    }
})

console.log(store.getState())
