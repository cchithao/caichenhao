//每次调用get.post.ajsx的时候回先调用这个换上

$.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url

})