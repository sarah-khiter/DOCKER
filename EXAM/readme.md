Lien pour acceder à wordpress : http://localhost:8080/wordpress/wp-admin/setup-config.php


Lien pour acceder à phpmyadmin : http://localhost:8080/phpmyadmin/


commandes :


docker build -t wordpress_mysql .


docker run -d -p 8080:80 --name wordpress_container wordpress_mysql
