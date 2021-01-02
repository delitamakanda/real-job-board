web: gunicorn project.wsgi:application --preload --log-file -
worker: celery -A project worker beat -l info --without-gossip --without-mingle --without-heartbeat
