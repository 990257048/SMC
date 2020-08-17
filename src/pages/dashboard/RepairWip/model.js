import {message} from 'antd';
import {test_api, test_api1} from './service';

let Model = {
    namespace: 'repairWip',
    state: {
        val: ''
    },
    reducers: {
        setVal (state, {val}) {
            return {...state, val};
        }
    },
    effects: {
        *timeOut ({delay}, {call, put}) {
            let d = yield call(test_api1, {delay});
            message.success(d.message);
        }
    }
}

export default Model;