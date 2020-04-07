FROM nginx

COPY docs/.vuepress/dist/ /usr/share/nginx/html/

COPY ./vhost.nginx.conf /etc/nginx/conf.d/jiangqianqian-blog.conf

EXPOSE 80
