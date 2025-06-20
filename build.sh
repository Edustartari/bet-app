set -o errexit

echo "BUILD START 1"

# create a virtual environment named 'venv' if it doesn't already exist
python3.9 -m venv venv

# activate the virtual environment
source venv/bin/activate

pip install -r requirements.txt

cd frontend/
npm install --legacy-peer-deps
npm install -D webpack-cli
npm run build

cd ..
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate

echo "BUILD END"