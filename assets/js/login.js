$(function () {
    $('#link_reg').on('click', function () {
        $('.login-zhuce').hide();
        $('.login-deng').show();

    })

    $('#link_login').on('click', function () {
        $('.login-deng').hide();
        $('.login-zhuce').show();

    })

    var layer = layui.layer
    var form = layui.form
    console.log(form);
    //  pwd: [
    //     /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    // ],

    //通过form.verify函数自定义校验规则
    form.verify({
        pwd: function (value) {
            var reg = /^[\S]{6,12}$/
            console.log(value);

            if (!reg.test(value)) {
                return '密码必须6到12位，且不能出现空格'
            }

        },

        repwd: function (value) {
            //通过行参数拿到的是确认密码框的
            //还需要拿到密码框中的参数
            //比较等于的判断，如果判断失败，则RETUTN一个消息即可
            var pwd = $('.login-deng [name=password]').val()

            if (pwd != value) {
                return '两次密码不一致';
            }
        }
    })



    //监听注册表单时间
    $('#form_reg').on('submit', function (e) {
        //组织默认的提交行为
        e.preventDefault();
        //发起ajax的POst请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);

            }
            layer.msg('注册成功请登录')

            //模拟人的点击行为

            $('#link_login').click();

        })
    })
    //监听表单登录
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')

                }
                layer.msg('登录成功')
                //讲获取成功的token字符保存到localStorage中
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
})