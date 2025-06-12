set -o errexit

echo "BUILD START"

# create a virtual environment named 'venv' if it doesn't already exist
python3.9 -m venv venv

# activate the virtual environment
source venv/bin/activate

pip install -r requirements.txt

# Check if mysqlclient is installed
if ! python -c "import MySQLdb" &> /dev/null; then
    echo "mysqlclient is not installed. Installing..."
    pip install mysqlclient
else
    echo "mysqlclient is already installed."
fi
# Check if psycopg2 is installed
if ! python -c "import psycopg2" &> /dev/null; then
    echo "psycopg2 is not installed. Installing..."
    pip install psycopg2
else
    echo "psycopg2 is already installed."
fi

# Enter MySQL
mysql -u root -proot
# Create the database if it doesn't exist
create database IF NOT EXISTS bet_app_database;
use bet_app_database;
# Create the user if it doesn't exist
# create user IF NOT EXISTS 'bet_app_user'@'localhost' identified by 'bet_app_password';
# Grant privileges to the user
# grant all privileges on bet_app_database.* to 'bet_app_user'@'localhost';
# flush privileges;
exit

cd frontend/
npm install -D webpack-cli
npm run build

cd ..
python manage.py collectstatic --noinput
python manage.py migrate

echo "BUILD END"