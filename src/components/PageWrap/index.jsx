import React, {useState, useMemo, useEffect, useCallback} from 'react';
import { connect } from 'umi';

let PageWrap = props => {    //使用该组件占整页高度，无滚动条 20200824 add by gch
    let {children, height} = props;

    let style = useMemo(() => {
        return {
            width: '100%',
            height: height - 100 + 'px',
            overflow: 'auto',
            overflowX: 'hidden'
        }
    }, [height]);

    return <div style={ style }>
        { children }
    </div>
}

export default connect(({global}) => ({
    height: global.height
}))(PageWrap);