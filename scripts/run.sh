# remove content of front (previous data) and copy from tmp folder to /r-client-web to reflect updates
rm -rf /r-client-web/build/* && cp -r /r-client-web_tmp/build/* /r-client-web
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input
gunicorn -w 4 -b 0.0.0.0:8000 project.wsgi:application
