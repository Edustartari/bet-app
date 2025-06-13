set -o errexit

echo "BUILD START 1"

# create a virtual environment named 'venv' if it doesn't already exist
python3.9 -m venv venv

# activate the virtual environment
source venv/bin/activate

pip install -r requirements.txt

# yum check-update
# yum update

# su -
# apt install sudo
# exit
# uname # OP is LINUX!
# pip install mysql-connector-python

# # Install sudo if not installed
# if ! command -v sudo &> /dev/null; then
#     echo "sudo could not be found, installing..."
#     apt update && apt install -y sudo
# else
#     echo "sudo is already installed."
# fi

# sudo apt install mysql-server
# rpm -Uvh https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm
# sed -i 's/enabled=1/enabled=0/' /etc/yum.repos.d/mysql-community.repo
# yum --enablerepo=mysql80-community install mysql-community-server 
# rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
# yum --enablerepo=mysql80-community install mysql-community-server
# mysql -V
# systemctl start mysqld
# systemctl status mysqld

# yum install mysql-server

# echo "yum install vi"
# yum install vi
# echo "vi /etc/yum.repos.d/mysql.repo"
# vi /etc/yum.repos.d/mysql.repo
# echo "rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022"
# rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
# echo "yum install mysql-community-server"
# yum install mysql-community-server
# echo "mysql -V"
# mysql -V
# echo "systemctl start mysqld"
# systemctl start mysqld

# dnf search mysql
# dnf install mariadb\*-server galera-4 MariaDB-client MariaDB-shared MariaDB-backup MariaDB-common

# pip install mysql-devel

# yum install mysql-community-server
# echo "mysql -V"
# mysql -V
# echo "systemctl start mysqld"
# systemctl start mysqld

# yum install wget
# rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
# wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
# yum localinstall -y mysql57-community-release-el7-8.noarch.rpm
# yum install -y mysql-community-server
# mysql -V
# sudo systemctl start mysqld 
# sudo systemctl enable mysqld

# mysql -u root -proot
# GRANT ALL PRIVILEGES ON *.* TO "root"@"localhost" IDENTIFIED BY "root" WITH GRANT OPTION;
# create database IF NOT EXISTS bet_app_database;
# use bet_app_database;
# exit

# # Check if mysqlclient is installed
# if ! python -c "import MySQLdb" &> /dev/null; then
#     echo "mysqlclient is not installed. Installing..."
#     pip install mysqlclient
# else
#     echo "mysqlclient is already installed."
# fi
# # Check if psycopg2 is installed
# if ! python -c "import psycopg2" &> /dev/null; then
#     echo "psycopg2 is not installed. Installing..."
#     pip install psycopg2
# else
#     echo "psycopg2 is already installed."
# fi

# Enter MySQL
# mysql -u root -proot
# Create the database if it doesn't exist
# create database IF NOT EXISTS bet_app_database;
# use bet_app_database;
# Create the user if it doesn't exist
# create user IF NOT EXISTS 'bet_app_user'@'localhost' identified by 'bet_app_password';
# Grant privileges to the user
# grant all privileges on bet_app_database.* to 'bet_app_user'@'localhost';
# flush privileges;
# exit

cd frontend/
npm install -D webpack-cli
npm run build

cd ..
python manage.py collectstatic --noinput
python manage.py migrate

echo "BUILD END"