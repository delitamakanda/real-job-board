from project.settings import *
from celery.schedules import crontab

import dj_database_url

DATABASES['default'] = dj_database_url.config()

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = ['*']

DEBUG = config('DEBUG', cast=bool)

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ADMINS = (
    ('Délita', 'delita.makanda@gmail.com'),
)

SEND_BROKEN_LINK_EMAILS=True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = config('EMAIL_HOST')
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_PORT = config('EMAIL_PORT')
EMAIL_USE_TLS = config('EMAIL_USE_TLS')

SERVER_EMAIL = config('SERVER_EMAIL')


# Static files deploy in S3 AWS
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

# AWS_LOCATION = 'static'

# STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# media upload files on S3 AWS

DEFAULT_FILE_STORAGE = 'project.storage_backends.MediaStorage'

# Cache

PAGE_CACHE_SECONDS = 60