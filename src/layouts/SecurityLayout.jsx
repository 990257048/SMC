// import React from 'react';
// import { PageLoading } from '@ant-design/pro-layout';
// import { Redirect, connect } from 'umi';
// import { stringify } from 'querystring';

// class SecurityLayout extends React.Component {
//   state = {
//     isReady: false,
//   };

//   componentDidMount() {
//     this.setState({
//       isReady: true,
//     });
//     const { dispatch, user } = this.props;
//     if (dispatch) {
//       // console.log(user);
//       user.login.status == "ok" && 
//       dispatch({    // 当前登录状态是成功的才去获取个人信息
//         type: 'user/fetchCurrent',
//       });
//     }
//   }

//   render() {
//     const { isReady } = this.state;
//     const { children, loading, user: {currentUser}  } = this.props; // You can replace it to your authentication rule (such as check token exists)
//     // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

//     const isLogin = currentUser && currentUser.userid;
//     const queryString = stringify({
//       redirect: window.location.href,
//     });

//     if ((!isLogin && loading) || !isReady) {
//       return <PageLoading />;
//     }

//     if (!isLogin && window.location.pathname !== '/user/login') {
//       return <Redirect to={`/user/login?${queryString}`} />;
//     }

//     return children;
//   }
// }

// export default connect(({ user, loading }) => ({
//   user,
//   currentUser: user.currentUser,
//   loading: loading.models.user,
// }))(SecurityLayout);



import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import cookies from 'js-cookie';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {  // 第一次（未登录）渲染完毕该组件执行，或者 （登录状态）每次刷新页面（会卸载该组件）又会重新一挂载（不是二次渲染）该组件，相当于又会进行第一次渲染，渲染完毕后触发执行
    // 每次页面刷新都会触发登录验证
    console.log("SecurityLayout rendered!!!");
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    console.log(cookies.get('token'));

    if (dispatch) {  // 登录验证
      dispatch({
        type: 'user/fetchCurrent',
        token: cookies.get('token')
      });
    }

  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = currentUser && currentUser.userid;
    const queryString = stringify({     // 加密跳转路径
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {   // 未登录 加载中 未准备好
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login') {  // 未登录 且 当前页不是登录页， 重定向到登录页，url附带登录后的重定向信息（当前页，加密）
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;   // 已登录 已准备好
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
